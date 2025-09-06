import { Schema, model } from "mongoose";
import { ICart, ICartItem } from "./cart.interface";

const CartItemSchema = new Schema<ICartItem>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  copyType: { type: String, enum: ["Hardcopy", "Softcopy"], required: true },
  quantity: { type: Number, default: 1, min: 1 },
  image: { type: String, required: true },
}, { _id: false });

const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: { type: [CartItemSchema], default: [] },
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

// 🔹 Pre-save hook to auto-calculate total price
CartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  next();
});

export const Cart = model<ICart>("Cart", CartSchema);
