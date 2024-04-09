import { Router } from "express";
import {
  patientSignin,
  patientSignup,
} from "../controller/patient/patient.auth";
export const patientRouter = Router();
patientRouter.post("/patient/signup", patientSignup);
patientRouter.post("/patient/signin", patientSignin);
