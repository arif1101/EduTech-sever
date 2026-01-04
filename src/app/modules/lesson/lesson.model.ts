import { Schema, model } from "mongoose";
import { ILesson } from "./lesson.interface";

const LessonSchema = new Schema<ILesson>(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>("Lesson", LessonSchema);
