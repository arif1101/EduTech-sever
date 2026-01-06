import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { PaymentController } from "./payment.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create-intent",
  checkAuth(...Object.values(Role)),
  PaymentController.createPaymentIntent
);

router.get(
  "/verify/:intentId",
  checkAuth(...Object.values(Role)),
  PaymentController.verifyPayment
);

export const PaymentRoutes = router;
