import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    brand: z.string(),
    price: z.number(),
    stockQuantity: z.number(),
    thumbnail: z.string(),
    categoryId: z.string(),
    createdBy: z.string(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
};
