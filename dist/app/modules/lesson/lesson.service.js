"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const mongoose_1 = require("mongoose");
const lesson_model_1 = require("./lesson.model");
const createLesson = async (payload) => {
    const lesson = await lesson_model_1.Lesson.create(payload);
    return lesson;
};
const getLessonsBySection = async (sectionId) => {
    const lessons = await lesson_model_1.Lesson.find({
        section: new mongoose_1.Types.ObjectId(sectionId),
    }).sort({ order: 1 });
    return lessons;
};
exports.LessonService = {
    createLesson,
    getLessonsBySection,
};
//# sourceMappingURL=lesson.service.js.map