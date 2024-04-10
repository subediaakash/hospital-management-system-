import { Router } from "express";
import { doctorSignin, signUp } from "../controller/doctor/doctor.auth";
import {
  completeAppointment,
  setupProfile,
  updateMedicalReport,
} from "../controller/doctor/doctor.application";
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

doctorRouter.post(
  "/doctor/report/:patientId",
  authMiddleware,
  doctorRoleCheck,
  updateMedicalReport
);
doctorRouter.put(
  "/doctor/appointment/:appointmentId",
  authMiddleware,
  doctorRoleCheck,
  completeAppointment
);
