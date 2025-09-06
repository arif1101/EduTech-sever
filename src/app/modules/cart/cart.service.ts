import { Cart } from "./cart.model";
import { Book } from "../book/book.model";
import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"

interface AddToCartPayload {
  userId: string;
  bookId: string;
  quantity: number;
  copyType: "Hardcopy" | "Softcopy";
}

const addToCart = async (payload: AddToCartPayload) => {
  const { userId, bookId, quantity, copyType } = payload;

  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND,"Book not found");
  }

  // Find existing cart
  let cart = await Cart.findOne({ user: userId });
    
  if (!cart) {
    // Create new cart if none exists
    cart = new Cart({
      user: userId,
      items: [],
      totalPrice: 0,
    });
  }

  // Check if book already exists in cart with same copyType
  const existingItem = cart.items.find(
    (item) => item.book.toString() === bookId && item.copyType === copyType
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      book: new Types.ObjectId(bookId),
      title: book.title,
      price: copyType === "Hardcopy" ? book.hardPrice : book.softPrice,
      copyType,
      quantity,
      image: book.image,
    });
  }

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  console.log("--------")//not printed
  return cart;
};

// get cart by User
const getUserCart = async (userId: Types.ObjectId) => {
  // Find the cart of the user and populate book details
  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.book",
    select: "title image softPrice hardPrice copyType category language",
  });

  return cart;
};

// remove from cart 
const removeFromCart = async (userId: Types.ObjectId, bookId: string) => {
  // Remove the book from user's cart
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { book: bookId } } }, // remove the item
    { new: true }
  ).populate({
    path: "items.book",
    select: "title image softPrice hardPrice copyType category language",
  });

  return cart;
};

// update cart 
const updateCart = async (userId: Types.ObjectId, bookId: string, quantity: number) => {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const cart = await Cart.findOneAndUpdate(
    { user: userId, "items.book": bookId },
    { $set: { "items.$.quantity": quantity } },
    { new: true }
  ).populate({
    path: "items.book",
    select: "title image softPrice hardPrice copyType category language",
  });

  return cart;
};

export const CartService = {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCart
};
