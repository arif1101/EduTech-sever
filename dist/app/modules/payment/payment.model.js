"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
// payment.model.ts
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Course" }],
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    paymentIntentId: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map