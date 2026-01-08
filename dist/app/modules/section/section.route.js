"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRoutes = void 0;
const express_1 = require("express");
const section_controller_1 = require("./section.controller");
const router = (0, express_1.Router)();
router.post("/create", section_controller_1.SectionController.createSection);
router.get("/course/:courseId", section_controller_1.SectionController.getSectionsByCourse);
exports.SectionRoutes = router;
//# sourceMappingURL=section.route.js.map