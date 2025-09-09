import { Types } from "mongoose";
export interface ICourseCartItem {
    course: Types.ObjectId;
    title: string;
    price: number;
    thumbnail?: string | undefined;
}
export interface ICourseCart {
    user: Types.ObjectId;
    items: ICourseCartItem[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=cart.course.interface.d.ts.map