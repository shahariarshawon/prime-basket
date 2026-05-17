import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { OrderService } from "./order.service.js";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (_req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});


const confirmOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.confirmOrder(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order confirmed",
    data: result,
  });
});

const cancelOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.cancelOrder(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order cancelled",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  confirmOrder,
  cancelOrder,
};