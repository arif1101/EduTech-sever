// config/stripe.ts
import Stripe from "stripe";
import { envVars } from "./env";

export const stripe = new Stripe(envVars.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});
