import express, { Router } from "express";
import { ProductController } from "./product.controller.js";
import validateSchema from "../../middleware/validateSchema.js";
import { ProductValidation } from "./product.validation.js";

const router: Router = express.Router();
// create product route
router.post(
  "/create-product",
  validateSchema(ProductValidation.productValidationSchema),
  ProductController.createProduct,
);
// get all product
router.get("/all-products", ProductController.getAllProducts);
// get single product
router.get(
  "/product/:id",
  validateSchema(ProductValidation.productValidationSchema),
  ProductController.getSingleProduct,
);
// update product
router.patch(
  "/update-product/:id",
  validateSchema(ProductValidation.productValidationSchema),
  ProductController.updateProduct,
);
router.delete(
  "/delete-product/:id",
  validateSchema(ProductValidation.productValidationSchema),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
