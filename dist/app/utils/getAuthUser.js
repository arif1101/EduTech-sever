"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = void 0;
const getAuthUser = (req) => {
    if (!req.user) {
        throw new Error("Unauthorized");
    }
    return req.user;
};
exports.getAuthUser = getAuthUser;
//# sourceMappingURL=getAuthUser.js.map