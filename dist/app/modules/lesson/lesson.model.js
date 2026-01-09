"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = require("mongoose");
const LessonSchema = new mongoose_1.Schema({
    section: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    isPreview: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Lesson = (0, mongoose_1.model)("Lesson", LessonSchema);
//# sourceMappingURL=lesson.model.js.map