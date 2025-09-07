import { Types } from "mongoose";
interface AddToCartPayload {
    userId: string;
    bookId: string;
    quantity: number;
    copyType: "Hardcopy" | "Softcopy";
}
export declare const CartService: {
    addToCart: (payload: AddToCartPayload) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").ICart, {}, {}> & import("./cart.interface").ICart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserCart: (userId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, import("./cart.interface").ICart, {}, {}> & import("./cart.interface").ICart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    removeFromCart: (userId: Types.ObjectId, bookId: string) => Promise<(import("mongoose").Document<unknown, {}, import("./cart.interface").ICart, {}, {}> & import("./cart.interface").ICart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateCart: (userId: Types.ObjectId, bookId: string, quantity: number) => Promise<(import("mongoose").Document<unknown, {}, import("./cart.interface").ICart, {}, {}> & import("./cart.interface").ICart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
export {};
//# sourceMappingURL=cart.service.d.ts.map