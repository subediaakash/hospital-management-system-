import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "../../zod/user.zod";

import createToken from "../../utils/create.token";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const patientSignup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const parsedPayload = userSchema.safeParse({ name, email, password, role });
  if (!parsedPayload.success) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      msg: "zod validation failed",
      error: parsedPayload.error,
    });
  }
  const existingUser = await prisma.patient.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return res.status(400).json({ message: "The doctor already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newPatient = await prisma.patient.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    },
  });
  const token = createToken({ email: email, role, id: newPatient.id });
  return res
    .status(STATUS_CODE.ACCEPTED)
    .json({ msg: "patient created successfully", token: token });
};

export const patientSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const patient = await prisma.patient.findUnique({
      where: {
        email,
      },
    });

    if (!patient) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, patient.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken({ email, role: patient.role, id: patient.id });

    return res
      .status(200)
      .json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
