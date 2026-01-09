import { Types } from "mongoose";
export interface IReview {
    _id?: Types.ObjectId;
    course: Types.ObjectId;
    user: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=review.interface.d.ts.map