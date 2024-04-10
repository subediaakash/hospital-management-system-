import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookAppointment = async (req: Request, res: Response) => {
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

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const listOfDoctors = await prisma.doctor.findMany({});
    return res.status(STATUS_CODE.ACCEPTED).json({ doctors: listOfDoctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching doctors" });
  }
};
