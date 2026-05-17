import prisma from "../../../lib/prisma";

const createProduct = async (payload: any) => {
  const result = await prisma.product.create({
    data: payload,
  });

  return result;
};

const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

const getSingleProduct = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const updateProduct = async (id: string, payload: any) => {
  return await prisma.product.update({
    where: { id },
    data: payload,
  });
};

const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
