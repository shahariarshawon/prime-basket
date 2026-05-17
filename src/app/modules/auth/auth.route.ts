import express, { Router } from "express";
import validateSchema from "../../middleware/validateSchema.js";
import { AuthValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

const router: Router = express.Router();

router.post(
  "/register",
  validateSchema(AuthValidation.registerValidationSchema),
  AuthController.registerUser,
);

router.post(
  "/login",
  validateSchema(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.post("/send-verification", AuthController.sendVerification);

router.post(
  "/verify-email",
  validateSchema(AuthValidation.verifyValidationSchema),
  AuthController.verifyUser,
);
router.get("/verified-users", AuthController.getVerifiedUsers);

export const AuthRoutes = router;
