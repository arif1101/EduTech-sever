import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const router = Router();

router.get(
  "/dashboard",
  checkAuth(Role.ADMIN),
  AdminController.getDashboard
);

export const AdminRoutes = router;
