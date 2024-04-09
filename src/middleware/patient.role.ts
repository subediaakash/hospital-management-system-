import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants";

export const patientRoleCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = res.locals.user.role;
  if (role !== "PATIENT") {
    return res
      .status(STATUS_CODE.FORBIDDEN)
      .json({ msg: "not enough permissions" });
  }
  next();
};
