import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { courseId, rating, message } = req.body;

  const review = await ReviewService.createReview(
    userId,
    courseId,
    rating,
    message
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const role = req.user!.role;
  const { reviewId } = req.params;

  await ReviewService.deleteReview(reviewId, userId, role);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review deleted successfully",
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { reviewId } = req.params;
  const { rating, message } = req.body;

  const review = await ReviewService.updateReview(
    reviewId,
    userId,
    rating,
    message
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review updated successfully",
    data: review,
  });
});

const getCourseReviews = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const reviews = await ReviewService.getCourseReviews(courseId);

  res.status(httpStatus.OK).json({
    success: true,
    data: reviews,
  });
});

const getMyReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { courseId } = req.params;
  const review = await ReviewService.getMyReview(userId, courseId);

  res.status(httpStatus.OK).json({
    success: true,
    data: review,
  });
});


export const ReviewController = {
  createReview,
  deleteReview,
  updateReview,
  getMyReview,
  getCourseReviews
};
