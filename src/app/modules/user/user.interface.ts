import { Types } from "mongoose";


export enum Role {
  ADMIN = "ADMIN",
  USER = "USER", // for EduTech you might rename this to STUDENT or TEACHER later
}


export enum IsActive {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}


export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}


export interface IUser {
  _id?: string;

  // Basic Info
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;

  // Account Status
  isDeleted?: boolean;   // changed from string → boolean (cleaner)
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;

  // Authentication
  auths: IAuthProvider[];


  // EduTech extensions (future use)
  enrolledCourses?: Types.ObjectId[];
  purchasedBooks?: Types.ObjectId[];
  examsTaken?: Types.ObjectId[];
  results?: Types.ObjectId[];
}
