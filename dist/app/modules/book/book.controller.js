"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const book_service_1 = require("./book.service");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
// create book 
const createBook = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const bookData = req.body;
    const book = await book_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Book created successfully",
        data: book,
    });
});
// getAllBooks
const getAllBooks = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const books = await book_service_1.BookService.getAllBooks();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
});
// single book 
const getSinglebook = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const bookId = req.params.id;
    if (!bookId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Book ID is required");
    }
    const book = await book_service_1.BookService.getSingleBook(bookId);
    if (!book) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Book not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use OK instead of CREATED
        message: "Book retrieved successfully",
        data: book,
    });
});
exports.BookController = {
    createBook,
    getAllBooks,
    getSinglebook
};
//# sourceMappingURL=book.controller.js.map