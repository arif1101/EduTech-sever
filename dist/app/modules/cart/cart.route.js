"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const cart_controller_1 = require("./cart.controller");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/add", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_controller_1.CartController.addToCart);
router.get("/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_controller_1.CartController.getUserCart);
router.delete("/remove/:bookId", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_controller_1.CartController.removeFromCart);
router.patch("/update", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_controller_1.CartController.updateCart);
exports.CartRoutes = router;
//# sourceMappingURL=cart.route.js.map