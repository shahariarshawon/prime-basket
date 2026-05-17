import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { ProductService } from "./product.service.js";
import status from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created",
    data: result,
  });
});

const getAllProducts = catchAsync(async (_req, res) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products retrieved",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single product retrieved",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
