"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), review_controller_1.ReviewController.createReview);
router.delete("/:reviewId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), review_controller_1.ReviewController.deleteReview);
router.patch("/:reviewId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), review_controller_1.ReviewController.updateReview);
// review.route.ts - Add this route
router.get("/course/:courseId/my-review", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), review_controller_1.ReviewController.getMyReview);
router.get("/course/:courseId", review_controller_1.ReviewController.getCourseReviews);
exports.ReviewRoutes = router;
//# sourceMappingURL=review.route.js.map