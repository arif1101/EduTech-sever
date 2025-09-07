"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
// create book 
const createBook = async (payload) => {
    const book = await book_model_1.Book.create(payload);
    return book;
};
// get all book 
const getAllBooks = async () => {
    const books = await book_model_1.Book.find().lean();
    return books;
};
// single book 
const getSingleBook = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const book = await book_model_1.Book.findById(id)
        // .populate("instructor")      // populate instructor if it's a ref
        // .populate("instructors")     // populate multiple instructors
        .lean();
    return book;
};
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook
};
//# sourceMappingURL=book.service.js.map