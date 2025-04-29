import { prisma } from '../utils/prisma';
import { Order, Prisma } from '../../generated/prisma';

export const createOrder = async () => {
};

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      client: true,
      address: true,
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });
  
  return orders;
};

export const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      client: true,
      address: true,
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id }
  });

  if (!existingOrder) {
    throw new Error('Order not found');
  }

  if (existingOrder.status === 'CANCELLED') {
    throw new Error('Cannot update a cancelled order');
  }
  
  if (existingOrder.status === 'DELIVERED' && status !== 'DELIVERED') {
    throw new Error('Cannot change status of a delivered order');
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: status as any
    },
    include: {
      client: true,
      address: true,
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  return updatedOrder;
};

export const deleteOrder = async (id: string) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id }
  });

  if (!existingOrder) {
    throw new Error('Order not found');
  }

  await prisma.$transaction([
    prisma.orderItem.deleteMany({
      where: { orderId: id }
    }),
    prisma.order.delete({
      where: { id }
    })
  ]);

  return true;
};
