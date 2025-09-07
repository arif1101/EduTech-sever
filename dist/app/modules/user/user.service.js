"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (payload.role === user_interface_1.Role.ADMIN) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Your cannot create ADMIN");
    }
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    // user create 
    const user = await user_model_1.User.create({
        email,
        password: hashedPassword,
        ...rest
    });
    return user;
};
const getMyProfile = async (userId) => {
    const user = await user_model_1.User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return {
        user
    };
};
const updateUser = async (userId, payload, decodedToken) => {
    // find user by id 
    const isUserExist = await user_model_1.User.findById(userId);
    // user not exist
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    // if body data have role
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Your are not authorized");
        }
    }
    // if body data have status
    // if(payload.accountStatus || payload.commissionRate || payload.status) {
    //     if(decodedToken.role === Role.USER || decodedToken.role === Role.AGENT){
    //         throw new AppError(httpStatus.FORBIDDEN, "Your are not authorized")
    //     }
    // }
    if (payload.password) {
        payload.password = await bcryptjs_1.default.hash(payload.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    }
    if (payload.phone) {
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(payload.phone)) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Invalid phone number format');
        }
    }
    if (payload.email) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "email can not be change");
    }
    const newUpdateduser = await user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdateduser;
};
exports.UserServices = {
    createUser,
    getMyProfile,
    updateUser
};
//# sourceMappingURL=user.service.js.map