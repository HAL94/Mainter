import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { PrismaService } from './prisma/prisma.service';

function generateRandomPlate() {
  const letters = Array.from({ length: 3 }, () => randomLetter());
  const digits = Array.from({ length: 4 }, () => randomNumber());
  const hyphen = '-';
  const randomString = letters.join('') + hyphen + digits.join('');
  return randomString;
}

function randomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

function randomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateRandomYear() {
  const startYear = 1970; // Start year for the valid range
  const endYear = 2023; // End year for the valid range

  return String(
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear,
  );
}

const clientSeedData = (appId: string) => {
  return [...Array(24)].map(() => {
    const sampleData: any = {
      fullName: faker.person.fullName(),
      mobile: faker.phone.number(),
      type: sample(['BUSINESS', 'INDIVIDUAL']),
      code: faker.number.int(),
      email: faker.internet.email(),
      appId,
    };

    sampleData.businessName =
      sampleData.type === 'BUSINESS' ? faker.company.name() : null;

    return sampleData;
  });
};

const vehicleSeedData = (clients: any[], appId: string) => {
  const ids = clients.map((client) => client.id);
  return [...Array(24)].map(() => {
    const sampleData: any = {
      appId,
      ownerId: sample(ids),
      make: faker.company.name(),
      model: faker.commerce.productName(),
      plate: generateRandomPlate(),
      year: generateRandomYear(),
      engineNo: faker.airline.flightNumber(),
    };
    return sampleData;
  });
};

export default async function startSeed(prisma: PrismaService, appId: string) {
  try {
    await prisma.clientVehicle.deleteMany({});
    await prisma.client.deleteMany({});

    const clients = clientSeedData(appId);

    await prisma.client.createMany({
      data: clients,
    });

    const createdClients = await prisma.client.findMany({});

    const vehicles = vehicleSeedData(createdClients, appId);

    await prisma.clientVehicle.createMany({
      data: vehicles,
    });
  } catch (error) {
    console.log('error seeding', error);
    throw error;
  }
}
