import { model, Schema } from "mongoose";
import { IBook, IReview } from "./book.interface";

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  _id: false
});

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  softPrice: { type: Number, required: true },
  hardPrice: { type: Number, required: true },
  details: { type: String, required: true },
  category: { type: String },
  publishedDate: { type: Date },
  stock: { type: Number, default: 0 },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
}, {
  timestamps: true
});

export const Book = model<IBook>("Book", bookSchema);

