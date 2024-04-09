import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(["DOCTOR", "PATIENT"]),
});
