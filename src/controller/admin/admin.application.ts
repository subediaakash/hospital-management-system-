import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { STATUS_CODE } from "../../constants";

const prisma = new PrismaClient();

export const verifyRequest = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.appointmentId);
  console.log(appointmentId);

  try {
    const updatedAppointment = await prisma.appoitment.update({
      where: {
        id: appointmentId,
      },
      data: {
        verified: true,
      },
    });
    res
      .status(STATUS_CODE.ACCEPTED)
      .json({ msg: "Appointment verified successfully" });
  } catch (error) {
    console.error("Error verifying appointment:", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error verifying appointment" });
  }
};

export const getRequests = async (req: Request, res: Response) => {
  const appointmentRequests = await prisma.appoitment.findMany({});
  return res.status(STATUS_CODE.ACCEPTED).json({ msg: appointmentRequests });
};

export const deleteRequest = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const deletedAppointment = await prisma.appoitment.delete({
    where: {
      id: appointmentId,
    },
  });
  return res
    .status(STATUS_CODE.ACCEPTED)
    .json({ msg: "the appointment deleted successfully" });
};

export const addSpeciality = async (req: Request, res: Response) => {
  const title = req.body.title;
  if (!title || title.length == 0) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: "title not given" });
  }
  const newSpeciality = await prisma.specialty.create({
    data: {
      title: title,
    },
  });
  return res
    .status(STATUS_CODE.ACCEPTED)
    .json({ msg: "title added successfully", title: newSpeciality });
};
