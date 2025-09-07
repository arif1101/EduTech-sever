"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.CourseClassLevel = exports.CourseLanguage = exports.CourseCategory = exports.CourseLevel = void 0;
const mongoose_1 = require("mongoose");
// ---------- Enums ----------
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["BEGINNER"] = "Beginner";
    CourseLevel["INTERMEDIATE"] = "Intermediate";
    CourseLevel["ADVANCED"] = "Advanced";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["ACADEMIC"] = "Academic";
    CourseCategory["TECHNOLOGY"] = "Technology";
    CourseCategory["BUSINESS"] = "Business";
    CourseCategory["ARTS"] = "Arts";
    CourseCategory["LANGUAGE"] = "Language";
})(CourseCategory || (exports.CourseCategory = CourseCategory = {}));
var CourseLanguage;
(function (CourseLanguage) {
    CourseLanguage["ENGLISH"] = "English";
    CourseLanguage["BANGLA"] = "Bangla";
})(CourseLanguage || (exports.CourseLanguage = CourseLanguage = {}));
var CourseClassLevel;
(function (CourseClassLevel) {
    CourseClassLevel["CLASS_11_12"] = "Class 11-12";
    CourseClassLevel["VERSITY"] = "Versity";
})(CourseClassLevel || (exports.CourseClassLevel = CourseClassLevel = {}));
// ---------- Subschemas ----------
const InstructorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    photo: String,
    status: String,
});
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});
const OverviewSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    whatYouWillLearn: [String],
    requirements: [String],
    thisCourseIncludes: [String],
});
const CurriculumSectionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    contents: [String],
});
// ---------- Main Schema ----------
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: Object.values(CourseCategory),
        required: true,
    },
    subject: { type: String, required: true },
    language: {
        type: String,
        enum: Object.values(CourseLanguage),
        required: true,
    },
    classLevel: {
        type: String,
        enum: Object.values(CourseClassLevel),
        required: true,
    },
    studentsEnrolled: { type: Number, default: 0 },
    lastUpdate: { type: Date, default: Date.now },
    level: {
        type: String,
        enum: Object.values(CourseLevel),
        required: true,
    },
    duration: { type: Number, required: true }, // hours
    price: { type: Number },
    thumbnail: { type: String },
    tags: [String],
    instructor: InstructorSchema,
    instructors: [InstructorSchema],
    overview: OverviewSchema,
    curriculum: [CurriculumSectionSchema],
    reviews: [ReviewSchema],
    averageRating: { type: Number, min: 0, max: 5 },
}, { timestamps: true });
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
//# sourceMappingURL=course.model.js.map