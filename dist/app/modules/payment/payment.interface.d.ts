import { Types } from "mongoose";
export interface IPayment {
    user: Types.ObjectId;
    courses: Types.ObjectId[];
    amount: number;
    currency: string;
    paymentIntentId: string;
    status: "pending" | "paid" | "failed";
    createdAt?: Date;
}
//# sourceMappingURL=payment.interface.d.ts.map