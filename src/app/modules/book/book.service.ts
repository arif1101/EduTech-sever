import { Types } from "mongoose";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

// create book 
const createBook = async (payload: IBook) => {
  const book = await Book.create(payload);
  return book;
};


// get all book 
const getAllBooks = async (): Promise<IBook[]> => {
  const books = await Book.find().lean<IBook[]>();
  return books;
};

// single book 
const getSingleBook = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;

  const book = await Book.findById(id)
    // .populate("instructor")      // populate instructor if it's a ref
    // .populate("instructors")     // populate multiple instructors
    .lean();

  return book;
};


export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook
};
