import { prisma } from '../utils/prisma';
import { OrderItem, Prisma } from '../../generated/prisma';


export const createOrderItem = async (data: Prisma.OrderItemUncheckedCreateInput) => {
    if (data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const subTotal = product.price * data.quantity;

    return await prisma.orderItem.create({
      data: {
        ...data,
        subTotal,
      },
    });

};


export const getAllOrderItems = async () => {
    return await prisma.orderItem.findMany();
};


export const getOrderItemById = async (id: string) => {
    return await prisma.orderItem.findUnique({
    where: { id },
  });
};


export const updateOrderItem = async (id: string, data: Partial<Omit<OrderItem, 'id'>>) => {
  if (data.quantity !== undefined) {
    if (data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (data.productId !== undefined && data.quantity !== undefined) {
      const product = await prisma.product.findUnique({
          where: { id: data.productId },
          select: { price: true },
        });
      
        if (product) {
          data.subTotal = product.price * data.quantity;
        }
    }
  }

 
  return await prisma.orderItem.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteOrderItem = async (id: string) => {
    await prisma.orderItem.delete({
      where: { id },
    });
};