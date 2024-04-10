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
