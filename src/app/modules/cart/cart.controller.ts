import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { CartService } from "./cart.service";
import AppError from "../../errorHelpers/AppError";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // assuming checkAuth middleware sets req.user
  console.log(userId)
  
  const { bookId, quantity, copyType } = req.body;

  const cart = await CartService.addToCart({ userId, bookId, quantity, copyType });


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book added to cart successfully",
    data: cart,
  });
});

// get cart by user 
const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Extract from JWT

  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND,"user not found");
  }

  const cart = await CartService.getUserCart(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart retrieved successfully",
    data: cart,
  });
});

// remove cart 
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // from JWT
  const bookId = req.params.bookId;

  if (!userId || !bookId) {
    throw new AppError(httpStatus.NOT_FOUND,"user or book not found");
  }

  const cart = await CartService.removeFromCart(userId, bookId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book removed from cart successfully",
    data: cart,
  });
});

// update cart 
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // from JWT
  const { bookId, quantity } = req.body;

  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND,"user not found");
  }

  const cart = await CartService.updateCart(userId, bookId, quantity);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart updated successfully",
    data: cart,
  });
});

export const CartController = {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCart
};
