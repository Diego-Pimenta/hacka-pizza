import { z } from 'zod';
import { PaymentMethod, OrderStatus } from '../../generated/prisma';

export const clientSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phoneNumber: z.string(),
  active: z.boolean().default(true),
  address: z.object({
    address: z.string(),
    region: z.string(),
    postCode: z.string(),
    country: z.string()
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const orderSchema = z.object({
  clientId: z.string().uuid(),
  addressId: z.string().uuid(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  status: z.nativeEnum(OrderStatus).default('PENDING'),
  total: z.number().positive(),
  orderItems: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
});

export const orderUpdateSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum(['DRINK', 'PIZZA']),
  size: z.string(),
  price: z.number().positive('Price must be a positive number'),
});
