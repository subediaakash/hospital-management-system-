import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adminRoleCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = res.locals.user.email;
  const adminexits = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });
  if (!adminexits) {
    return res
      .status(STATUS_CODE.FORBIDDEN)
      .json({ msg: "you dont have enough permissions to do the operations" });
  }
  next();
};
