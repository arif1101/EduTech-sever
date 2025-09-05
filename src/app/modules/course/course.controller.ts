/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CourseService } from "./course.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"




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

export const CourseController = {
    createCourse,
    getAllCourses
};