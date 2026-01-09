import { Types } from "mongoose";
import { ILesson } from "./lesson.interface";
export declare const LessonService: {
    createLesson: (payload: ILesson) => Promise<import("mongoose").Document<unknown, {}, ILesson, {}, {}> & ILesson & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getLessonsBySection: (sectionId: string) => Promise<(import("mongoose").Document<unknown, {}, ILesson, {}, {}> & ILesson & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=lesson.service.d.ts.map