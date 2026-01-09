// review.interface.ts
import { Types } from "mongoose";

export interface IReview {
  _id?: Types.ObjectId;
  course: Types.ObjectId;
  user: Types.ObjectId;
  rating: number; // 1-5
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}