"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importStar(require("mongoose"));
const course_model_1 = require("./course.model");
const section_model_1 = require("../section/section.model");
const lesson_model_1 = require("../lesson/lesson.model");
// create course
const createCourse = async (payload) => {
    const course = await course_model_1.Course.create(payload);
    return course;
};
// get all course
const getAllCourses = async (query) => {
    const filter = {};
    // ⭐ Rating filter
    if (query.minRating) {
        filter.averageRating = { $gte: Number(query.minRating) };
    }
    // 🌐 Language filter
    if (query.language) {
        filter.language = query.language;
    }
    // 🎓 Level filter
    if (query.level) {
        filter.level = query.level;
    }
    // 🗂 Category filter
    if (query.category) {
        filter.category = query.category;
    }
    // 💰 Price filter
    if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }
        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }
    }
    const courses = await course_model_1.Course.find(filter).lean();
    return courses;
};
// get single course
const getSingleCourse = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const course = await course_model_1.Course.findById(id)
        // .populate("instructor")      // populate instructor if it's a ref
        // .populate("instructors")     // populate multiple instructors
        .lean();
    return course;
};
const getFullCourse = async (courseId) => {
    // 1. Get course
    const course = await course_model_1.Course.findById(courseId);
    if (!course)
        return null;
    // 2. Get sections
    const sections = await section_model_1.Section.find({ course: courseId }).sort({ order: 1 });
    // 3. Get lessons for each section
    const sectionsWithLessons = await Promise.all(sections.map(async (section) => {
        const lessons = await lesson_model_1.Lesson.find({ section: section._id }).sort({
            order: 1,
        });
        return {
            ...section.toObject(),
            lessons,
        };
    }));
    return {
        course,
        sections: sectionsWithLessons,
    };
};
const deleteCourse = async (courseId) => {
    if (!mongoose_1.Types.ObjectId.isValid(courseId))
        return null;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // 1️⃣ Check course
        const course = await course_model_1.Course.findById(courseId).session(session);
        if (!course) {
            await session.abortTransaction();
            session.endSession();
            return null;
        }
        // 2️⃣ Find sections
        const sections = await section_model_1.Section.find({ course: courseId }).session(session);
        const sectionIds = sections.map(section => section._id);
        // 3️⃣ Delete lessons
        await lesson_model_1.Lesson.deleteMany({ section: { $in: sectionIds } }).session(session);
        // 4️⃣ Delete sections
        await section_model_1.Section.deleteMany({ course: courseId }).session(session);
        // 5️⃣ Delete course
        await course_model_1.Course.findByIdAndDelete(courseId).session(session);
        await session.commitTransaction();
        session.endSession();
        return true;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getFullCourse,
    deleteCourse
};
//# sourceMappingURL=course.service.js.map