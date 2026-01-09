// review.validation.ts
import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    course: z.string({
      required_error: "Course ID is required",
    }),
    rating: z
      .number({
        required_error: "Rating is required",
      })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    comment: z
      .string({
        required_error: "Comment is required",
      })
      .min(10, "Comment must be at least 10 characters")
      .max(1000, "Comment cannot exceed 1000 characters"),
  }),
});

const updateReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .optional(),
    comment: z
      .string()
      .min(10, "Comment must be at least 10 characters")
      .max(1000, "Comment cannot exceed 1000 characters")
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};