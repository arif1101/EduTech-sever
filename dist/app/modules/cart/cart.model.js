"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    copyType: { type: String, enum: ["Hardcopy", "Softcopy"], required: true },
    quantity: { type: Number, default: 1, min: 1 },
    image: { type: String, required: true },
}, { _id: false });
const CartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [CartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });
// 🔹 Pre-save hook to auto-calculate total price
CartSchema.pre("save", function (next) {
    this.totalPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    next();
});
exports.Cart = (0, mongoose_1.model)("Cart", CartSchema);
//# sourceMappingURL=cart.model.js.map