import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.listen(process.env.PORT, () => {
  console.log("app listening in the port" + process.env.PORT);
});
