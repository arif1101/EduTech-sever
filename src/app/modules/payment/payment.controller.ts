/* eslint-disable @typescript-eslint/no-non-null-assertion */
// payment.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";

const createPaymentIntent = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    console.log("-----userid-----:",userId)

    const clientSecret =
      await PaymentService.createPaymentIntent(userId);

    res.status(httpStatus.OK).json({
      success: true,
      clientSecret,
    });
  }
);

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { intentId } = req.params;
  const userId = req.user!.userId;

  if (!intentId) {
    throw new Error("Payment intent ID is required");
  }
  
  const result = await PaymentService.verifyPayment(intentId, userId);
  
  res.status(httpStatus.OK).json({
    success: true,
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  verifyPayment
};
