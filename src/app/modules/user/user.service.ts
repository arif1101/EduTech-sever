import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




const createUser = async(payload : Partial<IUser>) => {
    const {email, password, ...rest} = payload;

    const isUserExist = await User.findOne({email})

    if(payload.role === Role.ADMIN){
        throw new AppError(httpStatus.BAD_REQUEST, "Your cannot create ADMIN") 
    }

    if(isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    // user create 
    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    })

    return user
}

const getMyProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if(!user){
    throw new Error('User not found');
  }
  
  return {
    user
  }
};

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    // find user by id 
    const isUserExist = await User.findById(userId);
    // user not exist
    if(!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }
    // if body data have role
    if(payload.role){
        if(decodedToken.role === Role.USER || decodedToken.role === Role.ADMIN){
            throw new AppError(httpStatus.FORBIDDEN, "Your are not authorized")
        }
    }
    // if body data have status
    // if(payload.accountStatus || payload.commissionRate || payload.status) {
    //     if(decodedToken.role === Role.USER || decodedToken.role === Role.AGENT){
    //         throw new AppError(httpStatus.FORBIDDEN, "Your are not authorized")
    //     }
    // }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND))
    }

    if(payload.phone){
        const phoneRegex = /^01[0-9]{9}$/;
        if(!phoneRegex.test(payload.phone)){
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid phone number format')
        }
    }

    if(payload.email){
        throw new AppError(httpStatus.BAD_REQUEST, "email can not be change")
    }

    const newUpdateduser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

    return newUpdateduser
}

export const UserServices = {
    createUser,
    getMyProfile,
    updateUser
}