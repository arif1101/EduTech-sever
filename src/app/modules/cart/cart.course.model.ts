// courseCart.model.ts
import { Schema, model } from "mongoose";
import { ICourseCart, ICourseCartItem } from "./cart.course.interface";

const CourseCartItemSchema = new Schema<ICourseCartItem>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String},
  },
  { _id: false }
);

const CourseCartSchema = new Schema<ICourseCart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [CourseCartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CourseCartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
  next();
});

export const CourseCart = model<ICourseCart>("CourseCart", CourseCartSchema);
