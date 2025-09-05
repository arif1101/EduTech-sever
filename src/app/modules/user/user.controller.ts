/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { catchAsync } from "../../utils/catchAsync"
import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { NextFunction, Request, Response } from "express"
import { UserServices } from "./user.service"
import { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorHelpers/AppError"




const createUser = catchAsync(async(req: Request, res: Response) => {

    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user
    })
})

// get my profile 
const getMyProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.userId;
  const result = await UserServices.getMyProfile(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
})


// update user Profile

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const verifiedToken = req.user as JwtPayload;

  const userId = verifiedToken?.userId;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid user information");
  }

  const payload = req.body;

  const updateUser = await UserServices.updateUser(userId, payload, verifiedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: updateUser,
  });
});


export const UserControllers = {
    createUser,
    getMyProfile,
    updateUser
}