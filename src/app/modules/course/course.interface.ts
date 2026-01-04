import { Types } from "mongoose";

export enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

export enum CourseCategory {
  ACADEMIC = "Academic",
  TECHNOLOGY = "Technology",
  BUSINESS = "Business",
  ARTS = "Arts",
  LANGUAGE = "Language",
}

export enum CourseLanguage {
  ENGLISH = "English",
  BANGLA = "Bangla",
}

export enum CourseClassLevel {
  CLASS_11_12 = "Class 11-12",
  VERSITY = "Versity",
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
  title: string;        // e.g. "Live Classes", "Recorded Lectures"
  contents: string[];   // e.g. ["Class 1: Intro", "Class 2: Basics"]
}

export interface ICourse {
  _id?: string | Types.ObjectId;
  title: string;
  category: CourseCategory;     // Academic / Technology / Business / Arts
  subject: string;              // Physics / Chemistry / Web Dev
  language: CourseLanguage;     // English / Bangla (fixed enum)
  classLevel: CourseClassLevel; // Class 11-12 / Versity (fixed enum)

  studentsEnrolled: number;
  lastUpdate: Date;
  level: CourseLevel;
  duration: number;             // total hours
  price?: number;               // optional if free
  thumbnail?: string;           // cover image
  tags?: string[];              // e.g. ["math", "exam prep"]

  instructor: IInstructor;
  instructors: IInstructor[];   // multiple teachers if any
  overview: IOverview;
  curriculum: ICurriculumSection[];
  reviews: IReview[];
  averageRating?: number;
}

export interface CourseFilterQuery {
  minRating?: string;
  language?: string;
  level?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}
