import mongoose, { Types } from "mongoose";
import { CourseFilterQuery, ICourse } from "./course.interface";
export declare const CourseService: {
    createCourse: (payload: ICourse) => Promise<mongoose.Document<unknown, {}, import("./course.model").ICourse, {}, {}> & import("./course.model").ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllCourses: (query: CourseFilterQuery) => Promise<ICourse[]>;
    getSingleCourse: (id: string) => Promise<(mongoose.FlattenMaps<import("./course.model").ICourse> & Required<{
        _id: mongoose.FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
    getFullCourse: (courseId: string) => Promise<{
        course: mongoose.Document<unknown, {}, import("./course.model").ICourse, {}, {}> & import("./course.model").ICourse & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        sections: {
            lessons: (mongoose.Document<unknown, {}, import("../lesson/lesson.interface").ILesson, {}, {}> & import("../lesson/lesson.interface").ILesson & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            })[];
            course: Types.ObjectId;
            title: string;
            order?: number;
            _id: Types.ObjectId;
            __v: number;
        }[];
    } | null>;
    deleteCourse: (courseId: string) => Promise<true | null>;
};
//# sourceMappingURL=course.service.d.ts.map