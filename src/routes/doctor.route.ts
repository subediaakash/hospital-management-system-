import { Router } from "express";
import { doctorSignin, signUp } from "../controller/doctor/doctor.auth";
export const doctorRouter = Router();

doctorRouter.post("/doctor/signup", signUp);
doctorRouter.post("/doctor/signin", doctorSignin);
