import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "./auth.service.js";
import catchAsync from "../../../utils/catchAsync.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};