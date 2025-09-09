"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCartService = void 0;
const course_model_1 = require("../course/course.model"); // assuming you have a Course model
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cart_course_model_1 = require("./cart.course.model");
const addToCart = async ({ userId, courseId, }) => {
    // Check if course exists
    const course = await course_model_1.Course.findById(courseId);
    if (!course) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Course not found");
    }
    // Check if user already has a cart
    let cart = await cart_course_model_1.CourseCart.findOne({ user: userId });
    if (!cart) {
        // Create new cart for the user
        cart = new cart_course_model_1.CourseCart({
            user: userId,
            items: [
                {
                    course: course._id,
                    title: course.title,
                    price: course.price,
                    thumbnail: course.thumbnail,
                },
            ],
        });
    }
    else {
        // Check if course already exists in cart
        const courseExists = cart.items.some((item) => item.course.toString() === courseId);
        if (courseExists) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Course already in cart");
        }
        // Add new course to items
        cart.items.push({
            course: course._id, // <-- fixes TS error
            title: course.title,
            price: Number(course.price),
            thumbnail: course.thumbnail, // optional
        });
    }
    await cart.save();
    return cart;
};
const removeFromCart = async (userId, courseId) => {
    const cart = await cart_course_model_1.CourseCart.findOne({ user: userId });
    if (!cart) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart not found");
    }
    const itemIndex = cart.items.findIndex((item) => item.course.toString() === courseId);
    if (itemIndex === -1) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Course not found in cart");
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return cart;
};
const getUserCart = async (userId) => {
    const cart = await cart_course_model_1.CourseCart.findOne({ user: userId }).populate("items.course");
    if (!cart) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart not found");
    }
    return cart;
};
exports.CourseCartService = {
    addToCart,
    getUserCart,
    removeFromCart,
};
//# sourceMappingURL=cart.course.service.js.map