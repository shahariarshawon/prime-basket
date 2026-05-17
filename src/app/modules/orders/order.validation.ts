import { z } from "zod";

const orderValidationSchema = z.object({
  body: z.object({
    customerId: z.string(),
    addressId: z.string(),
    totalAmount: z.number(),
    orderItems: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        unitPrice: z.number(),
        totalPrice: z.number(),
      }),
    ),
  }),
});

export const OrderValidation = {
  orderValidationSchema,
};
