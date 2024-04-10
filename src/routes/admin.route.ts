import { Router } from "express";
import { adminSignin, adminSignUP } from "../controller/admin/admin.auth";
import {
  addSpeciality,
  deleteRequest,
  getRequests,
  verifyRequest,
} from "../controller/admin/admin.application";
import { authMiddleware } from "../middleware/jwt.auth";
import { adminRoleCheck } from "../middleware/admin.role";
export const adminRouter = Router();

adminRouter.post("/admin/signup", adminSignUP);
adminRouter.post("/admin/signin", adminSignin);
adminRouter.post(
  "/admin/verifyrequest/:appointmentId",
  authMiddleware,
  adminRoleCheck,
  verifyRequest
);
adminRouter.get(
  "/admin/getRequest",
  authMiddleware,
  adminRoleCheck,
  getRequests
);

adminRouter.delete(
  "/admin/delete/:appointmentId",
  authMiddleware,
  adminRoleCheck,
  deleteRequest
);

adminRouter.post(
  "/admin/addrole",
  authMiddleware,
  adminRoleCheck,
  addSpeciality
);
