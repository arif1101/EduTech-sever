import { z } from "zod";
export declare const ReviewValidation: {
    createReviewSchema: z.ZodObject<{
        body: z.ZodObject<{
            course: z.ZodString;
            rating: z.ZodNumber;
            comment: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateReviewSchema: z.ZodObject<{
        body: z.ZodObject<{
            rating: z.ZodOptional<z.ZodNumber>;
            comment: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=review.validation.d.ts.map