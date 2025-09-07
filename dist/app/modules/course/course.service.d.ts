import { ICourse } from "./course.interface";
export declare const CourseService: {
    createCourse: (payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, import("./course.model").ICourse, {}, {}> & import("./course.model").ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllCourses: () => Promise<ICourse[]>;
    getSingleCourse: (id: string) => Promise<(import("mongoose").FlattenMaps<import("./course.model").ICourse> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=course.service.d.ts.map