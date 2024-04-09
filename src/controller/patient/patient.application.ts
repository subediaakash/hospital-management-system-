import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookAppointment = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  const { time } = req.body;
  const patientId = res.locals.user.id;
  let responseSent = false;

  try {
    const newAppointment = await prisma.appoitment.create({
      data: {
        time: time,
        doctorId: parseInt(doctorId),
        patientId: parseInt(patientId),
      },
    });

    res.status(STATUS_CODE.CREATED).json(newAppointment);
    responseSent = true;
  } catch (error) {
    console.error("Error booking appointment:", error);

    if (!responseSent) {
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: "Error booking appointment" });
      responseSent = true;
    }
  }
};

export default bookAppointment;
