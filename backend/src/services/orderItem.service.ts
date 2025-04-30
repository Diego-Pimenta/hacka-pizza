import { prisma } from '../utils/prisma';
import { OrderItem, Prisma } from '../../generated/prisma';
import { HttpError } from '../utils/http.error';

export const createOrderItem = async (
  tx: Prisma.TransactionClient,
  data: Omit<Prisma.OrderItemCreateInput, 'order' | 'product' | 'subTotal'> & { orderId: string, productId: string, subTotal?: number }
) => {

  const product = await tx.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    throw new HttpError('Product not found', 404);
  }

  const subTotal = product.price * data.quantity;

  return await tx.orderItem.create({
    data: {
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
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
      throw new HttpError('Quantity must be greater than 0', 400);
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
