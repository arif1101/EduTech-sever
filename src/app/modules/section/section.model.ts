import { Schema, model } from "mongoose";
import { ISection } from "./section.interface";

const SectionSchema = new Schema<ISection>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Section = model<ISection>("Section", SectionSchema);
