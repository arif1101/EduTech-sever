"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const getDashboard = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await admin_service_1.AdminService.getDashboardData();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Dashboard data retrieved successfully",
        data,
    });
});
exports.AdminController = {
    getDashboard,
};
//# sourceMappingURL=admin.controller.js.map