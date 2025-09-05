import { IBook } from "./book.interface";
import { Book } from "./book.model";

// create course 
const createBook = async (payload: IBook) => {
  const book = await Book.create(payload);
  return book;
};


// get all course 
const getAllBooks = async (): Promise<IBook[]> => {
  const books = await Book.find().lean<IBook[]>();
  return books;
};


export const BookService = {
  createBook,
  getAllBooks
};
