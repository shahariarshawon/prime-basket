import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse.js";
import { AuthService } from "./auth.service.js";
import catchAsync from "../../../utils/catchAsync.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

const sendVerification = catchAsync(async (req: Request, res: Response) => {
  await AuthService.sendVerification(req.body.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Verification OTP sent",
    data: null,
  });
});

const verifyUser = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  await AuthService.verifyUser(email, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User verified successfully",
    data: null,
  });
});

const getVerifiedUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getVerifiedUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Verified users fetched successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  sendVerification,
  verifyUser,
  getVerifiedUsers,
};
