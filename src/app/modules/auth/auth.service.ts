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
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
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

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match) {
    throw new Error("Password incorrect");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    env.jwt_secret,
    { expiresIn: "7d" },
  );

  return { token };
};

const sendVerification = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  await sendEmail(email, "Email Verification OTP", `Your OTP is ${otp}`);
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
};

const getVerifiedUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
    },
  });

  return users;
};


export const AuthService = {
  registerUser,
  loginUser,
  sendVerification,
  verifyUser,
  getVerifiedUsers
};