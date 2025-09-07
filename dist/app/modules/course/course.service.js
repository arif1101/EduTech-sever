"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const mongoose_1 = require("mongoose");
const course_model_1 = require("./course.model");
// create course 
const createCourse = async (payload) => {
    const course = await course_model_1.Course.create(payload);
    return course;
};
// get all course 
const getAllCourses = async () => {
    const courses = await course_model_1.Course.find().lean();
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
exports.CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse
};
//# sourceMappingURL=course.service.js.map