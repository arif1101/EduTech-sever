import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { CourseController } from "./course.controller";

const router = Router();

router.post("/create", checkAuth(Role.ADMIN), CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourse);
router.get("/:id/full", CourseController.getFullCourse);
router.delete("/:id", checkAuth(Role.ADMIN), CourseController.deleteCourse);

export const CourseRoutes = router;
