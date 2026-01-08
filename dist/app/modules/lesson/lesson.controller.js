"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const lesson_service_1 = require("./lesson.service");
const createLesson = async (req, res) => {
    const lesson = await lesson_service_1.LessonService.createLesson(req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Lesson created successfully",
        data: lesson,
    });
};
const getLessonsBySection = async (req, res) => {
    const { sectionId } = req.params;
    if (!sectionId) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: "Section ID is required",
            data: null,
        });
    }
    const lessons = await lesson_service_1.LessonService.getLessonsBySection(sectionId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Lessons retrieved successfully",
        data: lessons,
    });
};
exports.LessonController = {
    createLesson,
    getLessonsBySection,
};
//# sourceMappingURL=lesson.controller.js.map