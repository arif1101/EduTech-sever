"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const course_service_1 = require("./course.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createCourse = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const courseData = req.body;
    const course = await course_service_1.CourseService.createCourse(courseData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Course created successfully",
        data: course,
    });
});
const getAllCourses = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const courses = await course_service_1.CourseService.getAllCourses();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Courses retrieved successfully",
        data: courses,
    });
});
const getSingleCourse = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const courseId = req.params.id;
    if (!courseId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Course ID is required");
    }
    const course = await course_service_1.CourseService.getSingleCourse(courseId);
    if (!course) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Course not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use OK instead of CREATED
        message: "Course retrieved successfully",
        data: course,
    });
});
exports.CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse
};
//# sourceMappingURL=course.controller.js.map