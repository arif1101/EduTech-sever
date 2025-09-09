"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCartController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const cart_course_service_1 = require("./cart.course.service");
// ➕ Add Course to Cart
const addToCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const { courseId } = req.body;
    const cart = await cart_course_service_1.CourseCartService.addToCart({ userId, courseId });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Course added to cart successfully",
        data: cart,
    });
});
// ❌ Remove a course from cart
const removeFromCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId;
    const courseId = req.params.courseId;
    console.log(userId, courseId);
    if (!userId || !courseId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User or Course not found");
    }
    const cart = await cart_course_service_1.CourseCartService.removeFromCart(userId, courseId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Course removed from cart successfully",
        data: cart,
    });
});
// 📦 Get User's Course Cart
const getUserCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const cart = await cart_course_service_1.CourseCartService.getUserCart(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Course cart retrieved successfully",
        data: cart,
    });
});
exports.CourseCartController = {
    addToCart,
    getUserCart,
    removeFromCart,
};
//# sourceMappingURL=cart.course.controller.js.map