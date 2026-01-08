import { Types } from "mongoose";
export interface ILesson {
    section: Types.ObjectId;
    title: string;
    videoUrl: string;
    order?: number;
    isPreview?: boolean;
}
//# sourceMappingURL=lesson.interface.d.ts.map