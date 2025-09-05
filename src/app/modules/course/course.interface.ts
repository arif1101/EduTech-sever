import { Types } from "mongoose";

export enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

export interface IInstructor {
  _id?: string | Types.ObjectId;
  name: string;
  photo?: string;
  status?: string; // e.g. "Professor", "Senior Instructor"
}

export interface IReview {
  user: Types.ObjectId; // reference to User
  rating: number;       // 1–5 stars
  comment?: string;
  createdAt?: Date;
}

export interface IOverview {
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  thisCourseIncludes: string[];
}

export interface ICurriculumSection {
  title: string;         // e.g. "Live Classes", "Recorded Lectures"
  contents: string[];    // e.g. ["Class 1: Intro", "Class 2: Basics"]
}

export interface ICourse {
  _id?: string | Types.ObjectId;
  title: string;
  studentsEnrolled: number;
  lastUpdate: Date;
  level: CourseLevel;
  instructor: IInstructor;
  overview: IOverview;
  curriculum: ICurriculumSection[];
  instructors: IInstructor[]; // in case of multiple teachers
  reviews: IReview[];
  averageRating?: number;
}
