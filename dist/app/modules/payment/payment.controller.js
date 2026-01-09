"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const payment_service_1 = require("./payment.service");
const createPaymentIntent = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    console.log("-----userid-----:", userId);
    const clientSecret = await payment_service_1.PaymentService.createPaymentIntent(userId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        clientSecret,
    });
});
const verifyPayment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { intentId } = req.params;
    const userId = req.user.userId;
    if (!intentId) {
        throw new Error("Payment intent ID is required");
    }
    const result = await payment_service_1.PaymentService.verifyPayment(intentId, userId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        data: result,
    });
});
exports.PaymentController = {
    createPaymentIntent,
    verifyPayment
};
//# sourceMappingURL=payment.controller.js.map