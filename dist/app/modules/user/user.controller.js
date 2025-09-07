"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_service_1.UserServices.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User created successfully",
        data: user
    });
});
// get my profile 
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.userId;
    const result = await user_service_1.UserServices.getMyProfile(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    });
});
// update user Profile
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const verifiedToken = req.user;
    const userId = verifiedToken?.userId;
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid user information");
    }
    const payload = req.body;
    const updateUser = await user_service_1.UserServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User updated successfully",
        data: updateUser,
    });
});
exports.UserControllers = {
    createUser,
    getMyProfile,
    updateUser
};
//# sourceMappingURL=user.controller.js.map