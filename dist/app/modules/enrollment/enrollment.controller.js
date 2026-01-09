"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const enrollment_service_1 = require("./enrollment.service");
const getMyEnrollments = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId;
    const enrollments = await enrollment_service_1.EnrollmentService.getMyEnrollments(userId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        data: enrollments,
    });
});
exports.EnrollmentController = {
    getMyEnrollments,
};
//# sourceMappingURL=enrollment.controller.js.map