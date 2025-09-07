import { IUser } from "../user/user.interface";
export declare const AuthServices: {
    credentialsLogin: (payload: Partial<IUser>) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map