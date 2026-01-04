import { Router } from "express";
import { SectionController } from "./section.controller";

const router = Router();

router.post("/create", SectionController.createSection);
router.get("/course/:courseId", SectionController.getSectionsByCourse);

export const SectionRoutes = router;
