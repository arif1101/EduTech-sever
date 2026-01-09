export declare const PaymentService: {
    createPaymentIntent: (userId: string) => Promise<string | null>;
    verifyPayment: (intentId: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map