import { Types } from "mongoose";
export interface IReview {
    user: Types.ObjectId;
    comment: string;
    rating: number;
    createdAt?: Date;
}
export interface IBook {
    _id?: string;
    title: string;
    author: string;
    image: string;
    softPrice: number;
    hardPrice: number;
    details: string;
    copyType: "Hardcopy" | "Softcopy";
    category: "Academic" | "Technology" | "Business";
    language: "English" | "Bangla";
    publishedDate?: Date;
    reviews?: IReview[];
    rating?: number;
    stock?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=book.interface.d.ts.map