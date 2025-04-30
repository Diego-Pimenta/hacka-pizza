import { prisma } from '../utils/prisma';
import { Product, Prisma } from '../../generated/prisma';

export const createProduct = async (data: Prisma.ProductCreateInput) => {
  const existingProduct = await prisma.product.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingProduct) {
    throw new Error('Product with this name already exists');
  }

  return await prisma.product.create({
    data,
  });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (id: string, data: Partial<Omit<Product, 'id'>>) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const getProductByName = async (name: string) => {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
};
