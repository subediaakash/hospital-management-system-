import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { PrismaClient } from "@prisma/client";
import { number } from "zod";

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
    const listOfDoctors = await prisma.doctor.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(listOfDoctors);

    return res.status(STATUS_CODE.ACCEPTED).json({ doctors: listOfDoctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching doctors" });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  const patientId = res.locals.user.id;
  const currentUser = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });
  return res.status(STATUS_CODE.ACCEPTED).json({
    name: currentUser?.name,
    id: currentUser?.id,
    email: currentUser?.email,
  });
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  const patientId = res.locals.user.id;
  try {
    const medicalHistory = await prisma.medicalreport.findMany({
      where: {
        patientId: patientId,
      },
    });
    return res.status(STATUS_CODE.ACCEPTED).json({ medicalHistory });
  } catch (error) {}
  return res
    .status(STATUS_CODE.EXPECTATION_FAILED)
    .json({ msg: "medical history not found" });
};
