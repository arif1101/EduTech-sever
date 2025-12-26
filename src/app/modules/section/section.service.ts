import { Types } from "mongoose";
import { Section } from "./section.model";
import { ISection } from "./section.interface";

const createSection = async (payload: ISection) => {
  const section = await Section.create(payload);
  return section;
};

const getSectionsByCourse = async (courseId: string) => {
  const sections = await Section.find({
    course: new Types.ObjectId(courseId),
  }).sort({ order: 1 });

  return sections;
};

export const SectionService = {
  createSection,
  getSectionsByCourse,
};
