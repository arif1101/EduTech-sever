import { Types } from "mongoose";
import { ISection } from "./section.interface";
export declare const SectionService: {
    createSection: (payload: ISection) => Promise<import("mongoose").Document<unknown, {}, ISection, {}, {}> & ISection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getSectionsByCourse: (courseId: string) => Promise<(import("mongoose").Document<unknown, {}, ISection, {}, {}> & ISection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=section.service.d.ts.map