import { NextFunction, Request, Response } from "express";
export declare const CourseController: {
    createCourse: (req: Request, res: Response, next: NextFunction) => void;
    getAllCourses: (req: Request, res: Response, next: NextFunction) => void;
    getSingleCourse: (req: Request, res: Response, next: NextFunction) => void;
    getFullCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCourse: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=course.controller.d.ts.map