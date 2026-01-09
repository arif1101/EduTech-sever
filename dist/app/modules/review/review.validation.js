"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
// review.validation.ts
const zod_1 = require("zod");
const createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().nonempty({ message: "Course ID is required" }),
        rating: zod_1.z
            .number({
            message: "Rating is required",
        })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot exceed 5"),
        comment: zod_1.z
            .string({
            message: "Comment is required",
        })
            .min(10, "Comment must be at least 10 characters")
            .max(1000, "Comment cannot exceed 1000 characters"),
    }),
});
const updateReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot exceed 5")
            .optional(),
        comment: zod_1.z
            .string()
            .min(10, "Comment must be at least 10 characters")
            .max(1000, "Comment cannot exceed 1000 characters")
            .optional(),
    }),
});
exports.ReviewValidation = {
    createReviewSchema,
    updateReviewSchema,
};
//# sourceMappingURL=review.validation.js.map