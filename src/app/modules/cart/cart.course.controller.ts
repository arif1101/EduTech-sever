// courseCart.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { CourseCartService } from "./cart.course.service";

// ➕ Add Course to Cart
const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const { courseId } = req.body;

  const cart = await CourseCartService.addToCart({ userId, courseId });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course added to cart successfully",
    data: cart,
  });
});

// ❌ Remove a course from cart
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const courseId = req.params.courseId;
  console.log(userId, courseId)

  if (!userId || !courseId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User or Course not found");
  }

  const cart = await CourseCartService.removeFromCart(userId, courseId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course removed from cart successfully",
    data: cart,
  });
});


// 📦 Get User's Course Cart
const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const cart = await CourseCartService.getUserCart(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course cart retrieved successfully",
    data: cart,
  });
});



export const CourseCartController = {
  addToCart,
  getUserCart,
  removeFromCart,
};
