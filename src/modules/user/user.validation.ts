import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "passqord must be at least 6 character!" })
        .max(20, { message: "password must be at most 20 character!" }),
      name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name must be at most 100 character!" }),
    })
    .strict(),
});
