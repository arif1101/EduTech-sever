import { Schema } from "mongoose";
export interface IReview {
    user: Schema.Types.ObjectId;
    course: Schema.Types.ObjectId;
    rating: number;
    message: string;
}
export declare const Review: import("mongoose").Model<IReview, {}, {}, {}, import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=review.model.d.ts.map