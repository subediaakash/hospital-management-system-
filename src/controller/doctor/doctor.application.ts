import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { STATUS_CODE } from "../../constants";

const prisma = new PrismaClient();

export const setupProfile = async (req: Request, res: Response) => {
  const specialityId = parseInt(req.params.specialityId);
  const qualifications = req.body.qualifications;

  try {
    const specialtyExists = await prisma.specialty.findUnique({
      where: {
        id: specialityId,
      },
    });

    if (!specialtyExists) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: "Specialty with the provided ID does not exist",
      });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: {
        email: res.locals.user.email,
      },
      data: {
        specialtyId: specialityId,
        qualifications: qualifications,
      },
    });

    return res.status(STATUS_CODE.ACCEPTED).json({
      msg: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error setting up profile:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: "Error setting up profile",
    });
  }
};

export const updateMedicalReport = async (req: Request, res: Response) => {
  try {
    const { symptoms, tests, results, prescription } = req.body;
    const patientId = parseInt(req.params.patientId);
    const doctorId = res.locals.user.id;

    const newMedicalReport = await prisma.medicalreport.create({
      data: {
        symptoms: symptoms,
        tests: tests,
        results: results,
        prescription: prescription,
        patientId: patientId,
        doctorId: doctorId,
      },
    });

    return res.status(STATUS_CODE.ACCEPTED).json({
      msg: "Medical report created successfully",
      medicalReport: newMedicalReport,
    });
  } catch (error) {
    console.error("Error creating medical report:", error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error creating medical report" });
  }
};

export const completeAppointment = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const completeAppointment = await prisma.appoitment.update({
    where: {
      id: appointmentId,
    },
    data: {
      completed: true,
    },
  });
  return res.status(STATUS_CODE.ACCEPTED).json({
    msg: "appointment status updated successfully",
    appointment: completeAppointment,
  });
};
