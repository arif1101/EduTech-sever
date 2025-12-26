import { Types } from "mongoose";

export interface ILesson {
  section: Types.ObjectId;
  title: string;
  videoUrl: string;   // YouTube embed link
  order?: number;
  isPreview?: boolean;
}
