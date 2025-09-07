import { Types } from "mongoose";
export declare enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare enum IsActive {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IAuthProvider {
    provider: "google" | "credentials";
    providerId: string;
}
export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    enrolledCourses?: Types.ObjectId[];
    purchasedBooks?: Types.ObjectId[];
    examsTaken?: Types.ObjectId[];
    results?: Types.ObjectId[];
}
//# sourceMappingURL=user.interface.d.ts.map