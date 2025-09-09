import { ICourseCart } from "./cart.course.interface";
export declare const CourseCartService: {
    addToCart: ({ userId, courseId, }: {
        userId: string;
        courseId: string;
    }) => Promise<ICourseCart>;
    getUserCart: (userId: string) => Promise<ICourseCart | null>;
    removeFromCart: (userId: string, courseId: string) => Promise<ICourseCart | null>;
};
//# sourceMappingURL=cart.course.service.d.ts.map