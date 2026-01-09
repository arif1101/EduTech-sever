"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
// payment.service.ts
const stripe_1 = require("../../config/stripe");
const payment_model_1 = require("./payment.model");
const cart_course_model_1 = require("../cart/cart.course.model");
const createPaymentIntent = async (userId) => {
    const cart = await cart_course_model_1.CourseCart.findOne({ user: userId });
    console.log("-------cart-----:", cart);
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const amount = cart.items.reduce((sum, item) => sum + Number(item.price), 0);
    console.log("-----amount-----:", amount);
    const paymentIntent = await stripe_1.stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        metadata: { userId },
    });
    console.log(paymentIntent);
    await payment_model_1.Payment.create({
        user: userId,
        courses: cart.items.map(i => i.course),
        amount,
        paymentIntentId: paymentIntent.id,
        status: "pending",
    });
    return paymentIntent.client_secret;
};
// payment.service.ts
const verifyPayment = async (intentId, userId) => {
    const paymentIntent = await stripe_1.stripe.paymentIntents.retrieve(intentId);
    if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment not completed");
    }
    const payment = await payment_model_1.Payment.findOneAndUpdate({ paymentIntentId: intentId, user: userId }, { status: "completed" }, { new: true });
    if (!payment) {
        throw new Error("Payment record not found");
    }
    // Clear cart after successful payment
    await cart_course_model_1.CourseCart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
    return payment;
};
exports.PaymentService = {
    createPaymentIntent,
    verifyPayment,
};
//# sourceMappingURL=payment.service.js.map