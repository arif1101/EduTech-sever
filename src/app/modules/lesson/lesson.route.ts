import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { LessonController } from "./lesson.controller";

const router = Router();

router.post(
  "/create",
  // checkAuth(Role.ADMIN),
  LessonController.createLesson
);

router.get(
  "/section/:sectionId",
  LessonController.getLessonsBySection
);

export const LessonRoutes = router;
