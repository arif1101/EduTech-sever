/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { BookService } from "./book.service";
import AppError from "../../errorHelpers/AppError";



// create book 
const createBook = catchAsync(async(req:Request, res: Response, next: NextFunction) => {
    const bookData = req.body;
    const book = await BookService.createBook(bookData)

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: book,
    });
})

// getAllBooks
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await BookService.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// single book 
const getSinglebook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  if (!bookId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Book ID is required");
  }

  const book = await BookService.getSingleBook(bookId);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK, // use OK instead of CREATED
    message: "Book retrieved successfully",
    data: book,
  });
});

export const BookController = {
    createBook,
    getAllBooks,
    getSinglebook
};