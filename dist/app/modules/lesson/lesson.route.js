"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRoutes = void 0;
const express_1 = require("express");
const lesson_controller_1 = require("./lesson.controller");
const router = (0, express_1.Router)();
router.post("/create", 
// checkAuth(Role.ADMIN),
lesson_controller_1.LessonController.createLesson);
router.get("/section/:sectionId", lesson_controller_1.LessonController.getLessonsBySection);
exports.LessonRoutes = router;
//# sourceMappingURL=lesson.route.js.map