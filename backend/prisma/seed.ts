import { hashPassword } from '../src/utils/bcrypt.handler';
import { prisma } from '../src/utils/prisma';
import { Category } from '../generated/prisma';

async function getUser() {
  const name = process.env.USER_NAME || 'admin';
  const email = process.env.USER_EMAIL || 'user@email.com';
  const password = process.env.USER_PASSWORD || '@password123';

  const hashedPassword = await hashPassword(password);
  return { name, email, password: hashedPassword };
}

function getAddresses() {
  return [
    {
      address: 'Rua da Independência, 45',
      region: 'SP',
      postCode: '87654-321',
      country: 'Brasil',
    },
    {
      address: 'Avenida Castelo Branco, 396',
      region: 'RJ',
      postCode: '12345-678',
      country: 'Brasil',
    },
  ];
}

function getClients() {
  return [
    {
      name: 'Carlos Adelson',
      cpf: '12345678900',
      phoneNumber: '11999999999',
    },
    {
      name: 'Mariana Silva',
      cpf: '98765432100',
      phoneNumber: '11988888888',
    },
  ];
}

function getProducts() {
  return [
    {
      name: 'Calabresa',
      description: '',
      category: Category.PIZZA,
      size: 'M',
      price: 49.99,
    },
    {
      name: 'Frango c/ catupiry',
      description: '',
      category: Category.PIZZA,
      size: 'M',
      price: 54.99,
    },
    {
      name: 'Camarão',
      description: '',
      category: Category.PIZZA,
      size: 'M',
      price: 64.99,
    },
    {
      name: 'Coca-Cola',
      description: '',
      category: Category.DRINK,
      size: '350mL',
      price: 7.99,
    },
    {
      name: 'Pepsi',
      description: '',
      category: Category.DRINK,
      size: '350mL',
      price: 7.99,
    },
  ];
}

async function seed() {
  const user = await getUser();
  await prisma.user.create({ data: user });

  const createdClients = await Promise.all(
    getClients().map((client) => {
      return prisma.client.create({
        data: client,
      });
    })
  );

  await Promise.all(
    getAddresses().map((address, index) => {
      return prisma.address.create({
        data: {
          ...address,
          clientId: createdClients[index]?.id,
        },
      });
    })
  );

  await Promise.all(
    getProducts().map((product) => {
      return prisma.product.create({
        data: product,
      });
    })
  );
}

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
})();
