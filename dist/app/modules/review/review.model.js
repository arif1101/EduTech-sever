"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
// One user can review a course only once
reviewSchema.index({ user: 1, course: 1 }, { unique: true });
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
//# sourceMappingURL=review.model.js.map