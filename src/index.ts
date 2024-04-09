import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { doctorRouter } from "./routes/doctor.route";
import { patientRouter } from "./routes/patient.route";
import { adminRouter } from "./routes/admin.route";

const app = express();

app.use(express.json());

app.use("/api/v1", doctorRouter);
app.use("/api/v1/", patientRouter);
app.use("/api/v1/", adminRouter);
app.listen(process.env.PORT, () => {
  console.log("app listening in the port" + process.env.PORT);
});
