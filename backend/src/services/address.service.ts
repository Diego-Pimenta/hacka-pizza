import { prisma } from '../utils/prisma';
import { Prisma } from '../../generated/prisma';
import { HttpError } from '../utils/http.error';

export const createAddress = async (clientId: string, data: Prisma.AddressCreateInput) => {
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new HttpError('Client not found', 404);

  const address = await prisma.address.create({
    data: {
      ...data,
      client: { connect: { id: clientId } }
    }
  });

  return address;
};

export const getClientAddresses = async (clientId: string) => {
  return await prisma.address.findMany({
    where: { clientId }
  });
};

export const updateAddress = async (addressId: string, data: Prisma.AddressUpdateInput) => {
  return await prisma.address.update({
    where: { id: addressId },
    data
  });
};

export const deleteAddress = async (addressId: string) => {
  return await prisma.address.delete({
    where: { id: addressId }
  });
};