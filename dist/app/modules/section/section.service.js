"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const mongoose_1 = require("mongoose");
const section_model_1 = require("./section.model");
const createSection = async (payload) => {
    const section = await section_model_1.Section.create(payload);
    return section;
};
const getSectionsByCourse = async (courseId) => {
    const sections = await section_model_1.Section.find({
        course: new mongoose_1.Types.ObjectId(courseId),
    }).sort({ order: 1 });
    return sections;
};
exports.SectionService = {
    createSection,
    getSectionsByCourse,
};
//# sourceMappingURL=section.service.js.map