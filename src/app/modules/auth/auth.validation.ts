import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

const verifyValidationSchema = z.object({
  body: z.object({
    email: z.email(),
    otp: z.string(),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  verifyValidationSchema,
};
