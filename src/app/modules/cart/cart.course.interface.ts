// courseCart.interface.ts
import { Types } from "mongoose";

export interface ICourseCartItem {
  course: Types.ObjectId;
  title: string;
  price: number;
  image?: string;
}

export interface ICourseCart {
  user: Types.ObjectId;
  items: ICourseCartItem[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
