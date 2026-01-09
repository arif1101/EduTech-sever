import { Request } from "express";

export const getAuthUser = (req: Request) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  return req.user;
};
