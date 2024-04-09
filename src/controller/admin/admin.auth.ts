import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { PrismaClient } from "@prisma/client";
import createToken from "../../utils/create.token";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const adminSignUP = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.admin.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return res.status(400).json({ message: "The doctor already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  const token = createToken({ email: email, id: newAdmin.id });
  return res
    .status(STATUS_CODE.ACCEPTED)
    .json({ msg: "admin id created successfully", token: token });
};

export const adminSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken({ email, id: admin.id });

    return res
      .status(200)
      .json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
