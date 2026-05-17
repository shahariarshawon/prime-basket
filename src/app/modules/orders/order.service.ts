import prisma from "../../../lib/prisma";

const createOrder = async (payload: any) => {
  return await prisma.order.create({
    data: payload,
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      orderItems: true,
    },
  });
};

const confirmOrder = async (id: string) => {
  return await prisma.order.update({
    where: { id },
    data: {
      orderStatus: "confirmed",
      canCancel: false,
    },
  });
};

const cancelOrder = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order?.canCancel) {
    throw new Error("Order cannot be canceled");
  }

  return await prisma.order.delete({
    where: { id },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  confirmOrder,
  cancelOrder,
};
