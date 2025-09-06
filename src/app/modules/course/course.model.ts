import { Schema, model, Document, Types } from "mongoose";

// ---------- Enums ----------
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

// ---------- Interfaces ----------
interface IInstructor {
  name: string;
  photo?: string;
  status?: string; // e.g. Professor
}

interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

interface IOverview {
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  thisCourseIncludes: string[];
}

interface ICurriculumSection {
  title: string;
  contents: string[];
}

export interface ICourse extends Document {
  title: string;
  category: CourseCategory;
  subject: string;
  language: CourseLanguage;
  classLevel: CourseClassLevel;

  studentsEnrolled: number;
  lastUpdate: Date;
  level: CourseLevel;
  duration: number;
  price?: number;
  thumbnail?: string;
  tags?: string[];

  instructor: IInstructor;
  instructors: IInstructor[];
  overview: IOverview;
  curriculum: ICurriculumSection[];
  reviews: IReview[];
  averageRating?: number;
}

// ---------- Subschemas ----------
const InstructorSchema = new Schema<IInstructor>({
  name: { type: String, required: true },
  photo: String,
  status: String,
});

const ReviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const OverviewSchema = new Schema<IOverview>({
  description: { type: String, required: true },
  whatYouWillLearn: [String],
  requirements: [String],
  thisCourseIncludes: [String],
});

const CurriculumSectionSchema = new Schema<ICurriculumSection>({
  title: { type: String, required: true },
  contents: [String],
});

// ---------- Main Schema ----------
const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(CourseCategory),
      required: true,
    },
    subject: { type: String, required: true },
    language: {
      type: String,
      enum: Object.values(CourseLanguage),
      required: true,
    },
    classLevel: {
      type: String,
      enum: Object.values(CourseClassLevel),
      required: true,
    },

    studentsEnrolled: { type: Number, default: 0 },
    lastUpdate: { type: Date, default: Date.now },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    duration: { type: Number, required: true }, // hours
    price: { type: Number },
    thumbnail: { type: String },
    tags: [String],

    instructor: InstructorSchema,
    instructors: [InstructorSchema],
    overview: OverviewSchema,
    curriculum: [CurriculumSectionSchema],
    reviews: [ReviewSchema],
    averageRating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", CourseSchema);
