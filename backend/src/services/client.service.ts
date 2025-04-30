import { prisma } from '../utils/prisma';
import { Client, Prisma } from '../../generated/prisma';

export const createClient = async (data: {
  name: string;
  cpf: string;
  phoneNumber: string;
  active: boolean;
  address: {
    address: string;
    region: string;
    postCode: string; 
    country: string;
  };
}) => {
  const client = await Promise.all([
    prisma.client.findUnique({
      where: {
        phoneNumber: data.phoneNumber,
      },
    }),
    prisma.client.findUnique({
      where: {
        cpf: data.cpf,
      },
    }),
  ]);

  if (client[0] || client[1]) {
    throw new Error('Client already exists');
  }

  const { address, ...clientData } = data;

  const cliente = await prisma.client.create({
    data: {
      ...clientData,
      address: {
        create: address
      }
    },
  });

  return cliente;
};

export const getAllClients = async () => {
  const clients = await prisma.client.findMany();
  return clients;
};

export const getClientById = async (id: string) => {
  const user = await prisma.client.findUnique({
    where: { id },
  });

  return user;
};

export const updateClient = async (id: string, data: Partial<Omit<Client, 'id'>>) => {
  if (data.phoneNumber) {
    const client = await prisma.client.findUnique({
      where: {
        id,
        phoneNumber: data.phoneNumber,
      },
    });
    if (client) {
      throw new Error('Client already exists');
    }
  }

  if (data.cpf) {
    const client = await prisma.client.findUnique({
      where: {
        id,
        cpf: data.cpf,
      },
    });

    if (client) {
      throw new Error('Client already exists');
    }
  }

  await prisma.client.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteClient = async (id: string) => {
  await prisma.client.delete({
    where: { id },
  });
};
