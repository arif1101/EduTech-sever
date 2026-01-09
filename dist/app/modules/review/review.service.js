"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const review_model_1 = require("./review.model");
const payment_model_1 = require("../payment/payment.model");
const mongoose_1 = require("mongoose");
const createReview = async (userId, courseId, rating, message) => {
    // 1. Check enrollment (payment completed)
    const hasPurchased = await payment_model_1.Payment.exists({
        user: userId,
        status: "completed",
        courses: new mongoose_1.Types.ObjectId(courseId),
    });
    if (!hasPurchased) {
        throw new Error("You must enroll in the course to review it");
    }
    // 2. Prevent duplicate review
    const alreadyReviewed = await review_model_1.Review.exists({
        user: userId,
        course: courseId,
    });
    if (alreadyReviewed) {
        throw new Error("You already reviewed this course");
    }
    // 3. Create review
    const review = await review_model_1.Review.create({
        user: userId,
        course: courseId,
        rating,
        message,
    });
    return review;
};
const deleteReview = async (reviewId, userId, role) => {
    const review = await review_model_1.Review.findById(reviewId);
    if (!review) {
        throw new Error("Review not found");
    }
    // Owner or admin can delete
    if (review.user.toString() !== userId && role !== "ADMIN") {
        throw new Error("Not authorized to delete this review");
    }
    await review.deleteOne();
};
const updateReview = async (reviewId, userId, rating, message) => {
    const review = await review_model_1.Review.findById(reviewId);
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
const getCourseReviews = async (courseId) => {
    const reviews = await review_model_1.Review.find({ course: courseId })
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    return reviews;
};
const getMyReview = async (userId, courseId) => {
    const review = await review_model_1.Review.findOne({
        user: userId,
        course: courseId,
    }).populate("user", "name email");
    return review;
};
exports.ReviewService = {
    createReview,
    deleteReview,
    updateReview,
    getCourseReviews,
    getMyReview,
};
//# sourceMappingURL=review.service.js.map