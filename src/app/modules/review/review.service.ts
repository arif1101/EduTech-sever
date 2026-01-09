import { Review } from "./review.model";
import { Payment } from "../payment/payment.model";
import { Types } from "mongoose";

const createReview = async (
  userId: string,
  courseId: string,
  rating: number,
  message: string
) => {
  // 1. Check enrollment (payment completed)
  const hasPurchased = await Payment.exists({
    user: userId,
    status: "completed",
    courses: new Types.ObjectId(courseId),
  });

  if (!hasPurchased) {
    throw new Error("You must enroll in the course to review it");
  }

  // 2. Prevent duplicate review
  const alreadyReviewed = await Review.exists({
    user: userId,
    course: courseId,
  });

  if (alreadyReviewed) {
    throw new Error("You already reviewed this course");
  }

  // 3. Create review
  const review = await Review.create({
    user: userId,
    course: courseId,
    rating,
    message,
  });

  return review;
};

const deleteReview = async (
  reviewId: string,
  userId: string,
  role: string
) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  // Owner or admin can delete
  if (
    review.user.toString() !== userId &&
    role !== "ADMIN"
  ) {
    throw new Error("Not authorized to delete this review");
  }

  await review.deleteOne();
};


const updateReview = async (
  reviewId: string,
  userId: string,
  rating: number,
  message: string
) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  // Only owner can edit
  if (review.user.toString() !== userId) {
    throw new Error("Not authorized to edit this review");
  }

  review.rating = rating;
  review.message = message;

  await review.save();

  return review;
};


export const ReviewService = {
  createReview,
  deleteReview,
  updateReview
};
