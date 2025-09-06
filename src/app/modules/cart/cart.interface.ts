import { Types } from "mongoose";

export interface ICartItem {
  book: Types.ObjectId;   // Reference to Book
  title: string;          // Book title (for quick display)
  price: number;          // Price at the time of adding
  copyType: "Hardcopy" | "Softcopy";
  quantity: number;       // Number of copies
  image: string;          // Thumbnail for cart UI
}

export interface ICart {
  user: Types.ObjectId;   // Reference to User
  items: ICartItem[];
  totalPrice: number;     // Calculated field
  createdAt?: Date;
  updatedAt?: Date;
}
