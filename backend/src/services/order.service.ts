import { prisma } from '../utils/prisma';
import { Order, Prisma } from '../../generated/prisma';
import * as OrderItemService from './orderItem.service';
import { HttpError } from '../utils/http.error';

export const createOrder = async (data: {
  clientId: string;
  addressId: string;
  paymentMethod: string;
  status?: string;
  orderItems: Array<{
    productId: string;
    quantity: number;
  }>;
}) => {
  const client = await prisma.client.findUnique({
    where: { id: data.clientId },
  });

  if (!client) {
    throw new HttpError('Client not found', 404);
  }

  const address = await prisma.address.findUnique({
    where: { id: data.addressId },
  });

  if (!address) {
    throw new HttpError('Address not found', 404);
  }

  if (address.clientId && address.clientId !== data.clientId) {
    throw new HttpError('Address does not belong to this client', 400);
  }

  //inicia uma transação no banco, criando o registro na tabela order e orderItem
  //os subTotais são calculados no orderItem.service
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        clientId: data.clientId,
        addressId: data.addressId,
        paymentMethod: data.paymentMethod as any,
        status: data.status as any || 'PENDING',
        total: 0, 
      },
      include: {
        client: true,
        address: true,
      },
    });

    let calculatedTotal = 0;

    for (const item of data.orderItems) {
      const createdItem = await OrderItemService.createOrderItem(tx, {
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
      });
      

      calculatedTotal += createdItem.subTotal;
    }

    await tx.order.update({
      where: { id: newOrder.id },
      data: { total: calculatedTotal },
    });

    return await tx.order.findUnique({
      where: { id: newOrder.id },
      include: {
        client: true,
        address: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  });

  return order;
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

export const getRevenueSummary = async () => {
  const allOrders = await prisma.order.findMany({
    select: {
      status: true,
      total: true,
    },
  });

  const summary = {
    total: 0,
    PENDING: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  };

  for (const order of allOrders) {
    summary.total += order.total;
    summary[order.status] += order.total;
  }

  return summary;
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
    throw new HttpError('Order not found', 404);
  }

  return order;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id }
  });

  if (!existingOrder) {
    throw new HttpError('Order not found', 404);
  }

  if (existingOrder.status === 'CANCELLED') {
    throw new HttpError('Cannot update a cancelled order', 400);
  }
  
  if (existingOrder.status === 'DELIVERED' && status !== 'DELIVERED') {
    throw new HttpError('Cannot change status of a delivered order', 400);
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
    throw new HttpError('Order not found', 404);
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
