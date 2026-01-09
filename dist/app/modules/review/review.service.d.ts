import { Types } from "mongoose";
export declare const ReviewService: {
    createReview: (userId: string, courseId: string, rating: number, message: string) => Promise<import("mongoose").Document<unknown, {}, import("./review.model").IReview, {}, {}> & import("./review.model").IReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteReview: (reviewId: string, userId: string, role: string) => Promise<void>;
    updateReview: (reviewId: string, userId: string, rating: number, message: string) => Promise<import("mongoose").Document<unknown, {}, import("./review.model").IReview, {}, {}> & import("./review.model").IReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getCourseReviews: (courseId: string) => Promise<(import("mongoose").Document<unknown, {}, import("./review.model").IReview, {}, {}> & import("./review.model").IReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getMyReview: (userId: string, courseId: string) => Promise<(import("mongoose").Document<unknown, {}, import("./review.model").IReview, {}, {}> & import("./review.model").IReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=review.service.d.ts.map