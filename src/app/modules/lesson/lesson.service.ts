import { Types } from "mongoose";
import { Lesson } from "./lesson.model";
import { ILesson } from "./lesson.interface";

const createLesson = async (payload: ILesson) => {
  const lesson = await Lesson.create(payload);
  return lesson;
};

const getLessonsBySection = async (sectionId: string) => {
  const lessons = await Lesson.find({
    section: new Types.ObjectId(sectionId),
  }).sort({ order: 1 });

  return lessons;
};

export const LessonService = {
  createLesson,
  getLessonsBySection,
};
