import { Types } from "mongoose";

export interface ISection {
  course: Types.ObjectId;
  title: string;
  order?: number;
}
