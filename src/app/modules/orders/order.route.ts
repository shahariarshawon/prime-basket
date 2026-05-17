import express, { Router } from "express";
import validateSchema from "../../middleware/validateSchema.js";
import { OrderValidation } from "./order.validation.js";
import { OrderController } from "./order.controller.js";

const router: Router = express.Router();
// create product route
router.post(
  "/create-order",
  validateSchema(OrderValidation.orderValidationSchema),
  OrderController.createOrder,
);
// get all product
router.get("/all-products", OrderController.getAllOrders);

// confirm order
router.patch(
  "/confirm-order/:id",
  validateSchema(OrderValidation.orderValidationSchema),
  OrderController.confirmOrder,
);

// cancel order
router.patch(
  "/cancel-order/:id",
  validateSchema(OrderValidation.orderValidationSchema),
  OrderController.cancelOrder,
);
export const ProductRoutes = router;
