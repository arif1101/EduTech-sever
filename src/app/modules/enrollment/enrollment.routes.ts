// enrollment.routes.ts
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { EnrollmentController } from "./enrollment.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/my-courses",
  checkAuth(...Object.values(Role)),
  EnrollmentController.getMyEnrollments
);

export const EnrollmentRoutes = router;