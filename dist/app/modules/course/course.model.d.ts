import { Document, Types } from "mongoose";
export declare enum CourseLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
}
export declare enum CourseCategory {
    ACADEMIC = "Academic",
    TECHNOLOGY = "Technology",
    BUSINESS = "Business",
    ARTS = "Arts",
    LANGUAGE = "Language"
}
export declare enum CourseLanguage {
    ENGLISH = "English",
    BANGLA = "Bangla"
}
export declare enum CourseClassLevel {
    CLASS_11_12 = "Class 11-12",
    VERSITY = "Versity"
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
export declare const Course: import("mongoose").Model<ICourse, {}, {}, {}, Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=course.model.d.ts.map