import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { doctorRouter } from "./routes/doctor.route";
import { patientRouter } from "./routes/patient.route";

const app = express();

app.use(express.json());

app.use("/api/v1", doctorRouter);
app.use("/api/v1/", patientRouter);
app.listen(process.env.PORT, () => {
  console.log("app listening in the port" + process.env.PORT);
});
