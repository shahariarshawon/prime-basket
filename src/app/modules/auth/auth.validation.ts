import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};