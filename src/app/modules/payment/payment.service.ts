// payment.service.ts
import { stripe } from "../../config/stripe";
import { Payment } from "./payment.model";
import { CourseCart } from "../cart/cart.course.model";

const createPaymentIntent = async (userId: string) => {
  const cart = await CourseCart.findOne({ user: userId });

  console.log("-------cart-----:", cart)

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const amount = cart.items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
  console.log("-----amount-----:", amount)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    metadata: { userId },
  });

  console.log(paymentIntent)

  await Payment.create({
    user: userId,
    courses: cart.items.map(i => i.course),
    amount,
    paymentIntentId: paymentIntent.id,
    status: "pending",
  });

  return paymentIntent.client_secret;
};


// payment.service.ts
const verifyPayment = async (intentId: string, userId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
  
  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not completed");
  }
  
  const payment = await Payment.findOneAndUpdate(
    { paymentIntentId: intentId, user: userId },
    { status: "completed" },
    { new: true }
  );
  
  if (!payment) {
    throw new Error("Payment record not found");
  }
  
  // Clear cart after successful payment
  await CourseCart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } }
  );
  
  return payment;
};

export const PaymentService = {
  createPaymentIntent,
  verifyPayment,
};
