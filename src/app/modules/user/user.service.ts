import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";




const createUser = async(payload : Partial<IUser>) => {
    const {phone, password, ...rest} = payload;

    const isUserExist = await User.findOne({phone})

    if(payload.role === Role.ADMIN){
        throw new AppError(httpStatus.BAD_REQUEST, "Your cannot create ADMIN") 
    }

    if(isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    // user create 
    const user = await User.create({
        phone,
        password: hashedPassword,
        ...rest
    })

    return user
}


export const UserServices = {
    createUser,
}