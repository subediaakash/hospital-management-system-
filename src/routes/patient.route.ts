import { Router } from "express";
import {
  patientSignin,
  patientSignup,
} from "../controller/patient/patient.auth";
import bookAppointment from "../controller/patient/patient.application";
import { authMiddleware } from "../middleware/jwt.auth";
import { patientRoleCheck } from "../middleware/patient.role";
export const patientRouter = Router();
patientRouter.post("/patient/signup", patientSignup);
patientRouter.post("/patient/signin", patientSignin);
patientRouter.post(
  "/patient/newappointment/:doctorId",
  authMiddleware,
  patientRoleCheck,
  bookAppointment
);
