"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const review_service_1 = require("./review.service");
const getAuthUser_1 = require("../../utils/getAuthUser");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = (0, getAuthUser_1.getAuthUser)(req);
    const { courseId, rating, message } = req.body;
    if (!courseId) {
        throw new Error("Course ID is required");
    }
    const review = await review_service_1.ReviewService.createReview(user.userId, courseId, rating, message);
    res.status(http_status_codes_1.default.CREATED).json({
        success: true,
        message: "Review added successfully",
        data: review,
    });
});
const deleteReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = (0, getAuthUser_1.getAuthUser)(req);
    const { reviewId } = req.params;
    if (!reviewId) {
        throw new Error("Review ID is required");
    }
    await review_service_1.ReviewService.deleteReview(reviewId, user.userId, user.role);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: "Review deleted successfully",
    });
});
const updateReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = (0, getAuthUser_1.getAuthUser)(req);
    const { reviewId } = req.params;
    const { rating, message } = req.body;
    if (!reviewId) {
        throw new Error("Review ID is required");
    }
    const review = await review_service_1.ReviewService.updateReview(reviewId, user.userId, rating, message);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: "Review updated successfully",
        data: review,
    });
});
const getCourseReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) {
        throw new Error("Course ID is required");
    }
    const reviews = await review_service_1.ReviewService.getCourseReviews(courseId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        data: reviews,
    });
});
const getMyReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = (0, getAuthUser_1.getAuthUser)(req);
    const { courseId } = req.params;
    if (!courseId) {
        throw new Error("Course ID is required");
    }
    const review = await review_service_1.ReviewService.getMyReview(user.userId, courseId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        data: review,
    });
});
exports.ReviewController = {
    createReview,
    deleteReview,
    updateReview,
    getMyReview,
    getCourseReviews,
};
//# sourceMappingURL=review.controller.js.map