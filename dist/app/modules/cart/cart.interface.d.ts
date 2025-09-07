import { Types } from "mongoose";
export interface ICartItem {
    book: Types.ObjectId;
    title: string;
    price: number;
    copyType: "Hardcopy" | "Softcopy";
    quantity: number;
    image: string;
}
export interface ICart {
    user: Types.ObjectId;
    items: ICartItem[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=cart.interface.d.ts.map