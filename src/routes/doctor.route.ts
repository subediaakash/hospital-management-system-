import { Router } from "express";
import { signUp } from "../controller/doctor/doctor.auth";
export const doctorRouter = Router();

doctorRouter.post("/doctor/signup", signUp);
