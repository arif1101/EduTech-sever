import { Request, Response } from "express";
export declare const LessonController: {
    createLesson: (req: Request, res: Response) => Promise<void>;
    getLessonsBySection: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=lesson.controller.d.ts.map