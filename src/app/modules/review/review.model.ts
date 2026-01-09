import { Schema, model } from "mongoose";

export interface IReview {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  rating: number;
  message: string;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

// One user can review a course only once
reviewSchema.index({ user: 1, course: 1 }, { unique: true });

export const Review = model<IReview>("Review", reviewSchema);
