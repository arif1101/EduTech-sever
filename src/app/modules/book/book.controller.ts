/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { BookService } from "./book.service";



// create book 
const createBook = catchAsync(async(req:Request, res: Response, next: NextFunction) => {
    const bookData = req.body;
    const book = await BookService.createBook(bookData)

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: book,
    });
})


const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await BookService.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

export const BookController = {
    createBook,
    getAllBooks
};