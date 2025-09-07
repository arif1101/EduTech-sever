import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { CourseCartController } from "./cart.course.controller";

const router = Router();

router.post("/course/add", checkAuth(...Object.values(Role)),CourseCartController.addToCart);
router.get("/course/me", checkAuth(...Object.values(Role)), CourseCartController.getUserCart);
router.delete("/course/remove/:courseId", checkAuth(...Object.values(Role)), CourseCartController.removeFromCart);
// router.patch("/course/update", checkAuth(...Object.values(Role)), CartController.updateCart);



export const CartCourseRoutes = router;