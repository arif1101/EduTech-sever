import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { ReviewService } from "./review.service";
import { getAuthUser } from "../../utils/getAuthUser";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { courseId, rating, message } = req.body;

  if (!courseId) {
    throw new Error("Course ID is required");
  }

  const review = await ReviewService.createReview(
    user.userId,
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
  const user = getAuthUser(req);
  const { reviewId } = req.params;

  if (!reviewId) {
    throw new Error("Review ID is required");
  }

  await ReviewService.deleteReview(reviewId, user.userId, user.role);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review deleted successfully",
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { reviewId } = req.params;
  const { rating, message } = req.body;

  if (!reviewId) {
    throw new Error("Review ID is required");
  }

  const review = await ReviewService.updateReview(
    reviewId,
    user.userId,
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

  if (!courseId) {
    throw new Error("Course ID is required");
  }

  const reviews = await ReviewService.getCourseReviews(courseId);

  res.status(httpStatus.OK).json({
    success: true,
    data: reviews,
  });
});

const getMyReview = catchAsync(async (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const { courseId } = req.params;

  if (!courseId) {
    throw new Error("Course ID is required");
  }

  const review = await ReviewService.getMyReview(user.userId, courseId);

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
  getCourseReviews,
};
