/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CourseService } from "./course.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";




const createCourse = catchAsync(async(req:Request, res: Response, next: NextFunction) => {
    const courseData = req.body;
    const course = await CourseService.createCourse(courseData)

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: course,
    });
})


const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: courses,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.id;

  if (!courseId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course ID is required");
  }

  const course = await CourseService.getSingleCourse(courseId);

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK, // use OK instead of CREATED
    message: "Course retrieved successfully",
    data: course,
  });
});



export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse
};