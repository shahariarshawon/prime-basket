import express, { Router } from "express";
import validateSchema from "../../middleware/validateSchema.js";
import { AuthValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

const router: Router = express.Router();

router.post(
  "/login",
  validateSchema(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;