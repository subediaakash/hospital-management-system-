import { Router } from "express";
import { doctorSignin, signUp } from "../controller/doctor/doctor.auth";
import { setupProfile } from "../controller/doctor/doctor.application";
import { authMiddleware } from "../middleware/jwt.auth";
import { doctorRoleCheck } from "../middleware/doctor.role";
export const doctorRouter = Router();

doctorRouter.post("/doctor/signup", signUp);
doctorRouter.post("/doctor/signin", doctorSignin);
doctorRouter.put(
  "/doctor/updateprofile/:specialityId",
  authMiddleware,
  doctorRoleCheck,
  setupProfile
);
