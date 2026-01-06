
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { EnrollmentService } from "./enrollment.service";

const getMyEnrollments = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const enrollments = await EnrollmentService.getMyEnrollments(userId);
  
  res.status(httpStatus.OK).json({
    success: true,
    data: enrollments,
  });
});

export const EnrollmentController = {
  getMyEnrollments,
};