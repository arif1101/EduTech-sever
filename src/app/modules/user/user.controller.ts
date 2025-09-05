
import { catchAsync } from "../../utils/catchAsync"
import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { User } from "./user.model"
import { Request, Response } from "express"
import { UserServices } from "./user.service"




const createUser = catchAsync(async(req: Request, res: Response) => {

    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user
    })
})

export const UserControllers = {
    createUser
}