"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cart_service_1 = require("./cart.service");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const addToCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId; // assuming checkAuth middleware sets req.user
    console.log(userId);
    const { bookId, quantity, copyType } = req.body;
    const cart = await cart_service_1.CartService.addToCart({ userId, bookId, quantity, copyType });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Book added to cart successfully",
        data: cart,
    });
});
// get cart by user 
const getUserCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId; // Extract from JWT
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
    }
    const cart = await cart_service_1.CartService.getUserCart(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Cart retrieved successfully",
        data: cart,
    });
});
// remove cart 
const removeFromCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId; // from JWT
    const bookId = req.params.bookId;
    if (!userId || !bookId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user or book not found");
    }
    const cart = await cart_service_1.CartService.removeFromCart(userId, bookId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Book removed from cart successfully",
        data: cart,
    });
});
// update cart 
const updateCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.userId; // from JWT
    const { bookId, quantity } = req.body;
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
    }
    const cart = await cart_service_1.CartService.updateCart(userId, bookId, quantity);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Cart updated successfully",
        data: cart,
    });
});
exports.CartController = {
    addToCart,
    getUserCart,
    removeFromCart,
    updateCart
};
//# sourceMappingURL=cart.controller.js.map