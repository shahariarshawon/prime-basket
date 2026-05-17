import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string().optional(),
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
    otp: z.string().length(6),
  }),
});

const sendOtpValidationSchema = z.object({
  body: z.object({
    email: z.email(),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  verifyValidationSchema,
  sendOtpValidationSchema,
};
