"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_model_1 = require("./cart.model");
const book_model_1 = require("../book/book.model");
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const addToCart = async (payload) => {
    const { userId, bookId, quantity, copyType } = payload;
    // Check if book exists
    const book = await book_model_1.Book.findById(bookId);
    if (!book) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Book not found");
    }
    // Find existing cart
    let cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        // Create new cart if none exists
        cart = new cart_model_1.Cart({
            user: userId,
            items: [],
            totalPrice: 0,
        });
    }
    // Check if book already exists in cart with same copyType
    const existingItem = cart.items.find((item) => item.book.toString() === bookId && item.copyType === copyType);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({
            book: new mongoose_1.Types.ObjectId(bookId),
            title: book.title,
            price: copyType === "Hardcopy" ? book.hardPrice : book.softPrice,
            copyType,
            quantity,
            image: book.image,
        });
    }
    // Recalculate total price
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    console.log("--------"); //not printed
    return cart;
};
// get cart by User
const getUserCart = async (userId) => {
    // Find the cart of the user and populate book details
    const cart = await cart_model_1.Cart.findOne({ user: userId }).populate({
        path: "items.book",
        select: "title image softPrice hardPrice copyType category language",
    });
    return cart;
};
// remove from cart 
const removeFromCart = async (userId, bookId) => {
    // Remove the book from user's cart
    const cart = await cart_model_1.Cart.findOneAndUpdate({ user: userId }, { $pull: { items: { book: bookId } } }, // remove the item
    { new: true }).populate({
        path: "items.book",
        select: "title image softPrice hardPrice copyType category language",
    });
    return cart;
};
// update cart 
const updateCart = async (userId, bookId, quantity) => {
    if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
    }
    const cart = await cart_model_1.Cart.findOneAndUpdate({ user: userId, "items.book": bookId }, { $set: { "items.$.quantity": quantity } }, { new: true }).populate({
        path: "items.book",
        select: "title image softPrice hardPrice copyType category language",
    });
    return cart;
};
exports.CartService = {
    addToCart,
    getUserCart,
    removeFromCart,
    updateCart
};
//# sourceMappingURL=cart.service.js.map