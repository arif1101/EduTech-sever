"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const payment_controller_1 = require("./payment.controller");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/create-intent", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), payment_controller_1.PaymentController.createPaymentIntent);
router.get("/verify/:intentId", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), payment_controller_1.PaymentController.verifyPayment);
exports.PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map