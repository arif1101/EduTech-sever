import { Router } from "express";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.createReview
);

router.delete(
  "/:reviewId",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.deleteReview
);

router.patch(
  "/:reviewId",
  checkAuth(Role.USER),
  ReviewController.updateReview
);

// review.route.ts - Add this route
router.get(
  "/course/:courseId/my-review",
  checkAuth(Role.USER, Role.ADMIN),
  ReviewController.getMyReview
);

router.get("/course/:courseId", ReviewController.getCourseReviews);


export const ReviewRoutes = router;
