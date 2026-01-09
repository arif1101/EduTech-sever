"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const section_service_1 = require("./section.service");
const createSection = async (req, res) => {
    const section = await section_service_1.SectionService.createSection(req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Section created successfully",
        data: section,
    });
};
const getSectionsByCourse = async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: "Course ID is required",
            data: null,
        });
    }
    const sections = await section_service_1.SectionService.getSectionsByCourse(courseId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Sections retrieved successfully",
        data: sections,
    });
};
exports.SectionController = {
    createSection,
    getSectionsByCourse,
};
//# sourceMappingURL=section.controller.js.map