import { Schema, model, Document, Types } from "mongoose";

export enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

interface IInstructor {
  name: string;
  photo?: string;
  status?: string;
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
  studentsEnrolled: number;
  lastUpdate: Date;
  level: CourseLevel;
  instructor: IInstructor;
  overview: IOverview;
  curriculum: ICurriculumSection[];
  instructors: IInstructor[];
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

// ---------- Main Course Schema ----------
const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    studentsEnrolled: { type: Number, default: 0 },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    instructor: InstructorSchema, // primary instructor
    overview: OverviewSchema,
    curriculum: [CurriculumSectionSchema],
    instructors: [InstructorSchema], // multiple instructors
    reviews: [ReviewSchema],
    averageRating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", CourseSchema);
