import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";

const getDashboard = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminService.getDashboardData();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard data retrieved successfully",
    data,
  });
});

export const AdminController = {
  getDashboard,
};
