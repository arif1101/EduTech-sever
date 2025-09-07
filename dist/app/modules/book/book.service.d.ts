import { Types } from "mongoose";
import { IBook } from "./book.interface";
export declare const BookService: {
    createBook: (payload: IBook) => Promise<import("mongoose").Document<unknown, {}, IBook, {}, {}> & IBook & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getAllBooks: () => Promise<IBook[]>;
    getSingleBook: (id: string) => Promise<(import("mongoose").FlattenMaps<{
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
        reviews?: {
            user: Types.ObjectId;
            comment: string;
            rating: number;
            createdAt?: Date;
        }[];
        rating?: number;
        stock?: number;
        createdAt?: Date;
        updatedAt?: Date;
    }> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=book.service.d.ts.map