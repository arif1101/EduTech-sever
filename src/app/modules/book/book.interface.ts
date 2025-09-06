import { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId; // reference to User
  comment: string;
  rating: number; // 1 to 5
  createdAt?: Date;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string; // could also reference User or a string
  image: string;
  softPrice: number;
  hardPrice: number;
  details: string; // description of the book
  copyType: "Hardcopy" | "Softcopy"; // ✅ new field
  category: "Academic" | "Technology" | "Business"; // ✅ new field
  language: "English" | "Bangla"; // ✅ new field
  publishedDate?: Date;
  reviews?: IReview[];
  rating?: number; // average rating
  stock?: number; // if you sell physical books
  createdAt?: Date;
  updatedAt?: Date;
}
