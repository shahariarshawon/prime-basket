import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../../config/env.js";
import sendEmail from "../../../utils/sendEmail";

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  return user;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(payload.password, user.hashedPassword);

  if (!match) {
    throw new Error("Password incorrect");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    env.jwt_secret,
    {
      expiresIn: "7d",
    },
  );

  return { token };
};

const sendVerification = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  await sendEmail(email, "Email Verification OTP", `Your OTP is ${otp}`);

  return {
    message: "OTP sent successfully",
  };
};

const verifyUser = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    throw new Error("OTP expired");
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      otp: null,
      otpExpiry: null,
    },
  });

  return {
    message: "User verified successfully",
  };
};

const getVerifiedUsers = async () => {
  return await prisma.user.findMany({
    where: {
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
    },
  });
};

export const AuthService = {
  registerUser,
  loginUser,
  sendVerification,
  verifyUser,
  getVerifiedUsers,
};
