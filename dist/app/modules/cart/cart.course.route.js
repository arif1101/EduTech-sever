"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartCourseRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const cart_course_controller_1 = require("./cart.course.controller");
const router = (0, express_1.Router)();
router.post("/course/add", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_course_controller_1.CourseCartController.addToCart);
router.get("/course/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_course_controller_1.CourseCartController.getUserCart);
router.delete("/course/remove/:courseId", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), cart_course_controller_1.CourseCartController.removeFromCart);
// router.patch("/course/update", checkAuth(...Object.values(Role)), CartController.updateCart);
exports.CartCourseRoutes = router;
//# sourceMappingURL=cart.course.route.js.map