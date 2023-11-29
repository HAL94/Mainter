import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

// dev deps
import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { PageDto } from './dto';
import { DeleteClientDto } from './dto/delete-client.dto';
import { GetClientDto } from './dto/get-one-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

const clientSeedData = () => {
  return [...Array(24)].map(() => {
    const sampleData: any = {
      fullName: faker.person.fullName(),
      mobile: faker.phone.number(),
      type: sample(['BUSINESS', 'INDIVIDUAL']),
      code: faker.number.int(),
      email: faker.internet.email(),
      ownerId: 1,
    };

    sampleData.businessName =
      sampleData.type === 'BUSINESS' ? faker.company.name() : null;

    return sampleData;
  });
};
// const clientMockData = () =>
//   [...Array(24)].map(() => {
//     const sampleData: Partial<Client> = {
//       id: faker.number.int(),
//       fullName: faker.person.fullName(),
//       mobile: faker.phone.number(),
//       type: sample(['BUSINESS', 'INDIVIDUAL']),
//       code: faker.number.int(),
//       email: faker.internet.email(),
//     };

//     sampleData.businessName =
//       sampleData.type === 'BUSINESS' ? faker.company.name() : '-';

//     return sampleData;
//   });

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getAllClients(pageInfo: PageDto, userId: number) {
    console.log('pageInfo', pageInfo);
    const {
      pageNo,
      pageSize,
      query,
      type,
      order: direction,
      orderBy: orderKey,
    } = pageInfo;
    const skip = (pageNo - 1) * pageSize;
    const take = pageSize;

    // const filterCriteria = ;

    const filteration: any = {
      ownerId: {
        equals: userId,
      },
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { businessName: { contains: query, mode: 'insensitive' } },
        { fullName: { contains: query, mode: 'insensitive' } },
        { mobile: { contains: query, mode: 'insensitive' } },
      ],
    };

    const orderation: any = {};

    if (orderKey && direction) {
      const obj = {
        [orderKey]: direction,
      };
      orderation.orderBy = obj;
    }

    if (type) {
      filteration.type = type;
    }

    const dataLength = await this.prisma.client.count({
      where: filteration,
      ...orderation,
    });

    const data = await this.prisma.client.findMany({
      skip,
      take,
      where: filteration,
      ...orderation,
    });

    return {
      table: {
        length: dataLength,
        data,
      },
    };
  }

  async addClient(clientData: CreateClientDto, userId: number) {
    try {
      const foundExisting = await this.prisma.client.findUnique({
        where: {
          email: clientData.email,
        },
      });

      if (this.config.get('NODE_ENV') === 'development') {
        await new Promise((r) => setTimeout(r, 1000));
      }

      if (foundExisting) {
        throw new HttpException(
          'Client email already exists, please enter a new one',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.client.create({
        data: {
          ownerId: userId,
          ...clientData,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(clientData: DeleteClientDto, userId: number) {
    try {
      const foundExisting = await this.prisma.client.findMany({
        where: {
          ownerId: userId,
          AND: [
            {
              id: { in: clientData.ids },
            },
          ],
        },
      });

      console.log('foundExisting', foundExisting);

      if (!foundExisting || foundExisting.length <= 0) {
        throw new HttpException(
          'Could not find record(s)',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.client.deleteMany({
        where: {
          id: { in: clientData.ids },
        },
      });

      return foundExisting;
    } catch (error) {
      throw error;
    }
  }

  async getOneClient(getClient: GetClientDto, userId: number) {
    try {
      const found = await this.prisma.client.findFirst({
        where: { ownerId: userId, AND: [{ id: Number(getClient.id) }] },
      });

      if (!found) {
        throw new HttpException(
          'Could not find client',
          HttpStatus.BAD_REQUEST,
        );
      }

      return found;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(editedClient: UpdateClientDto, userId: number) {
    try {
      console.log('body payload', editedClient);

      const found = await this.prisma.client.findFirst({
        where: { ownerId: userId, AND: [{ id: editedClient.id }] },
      });

      if (!found) {
        throw new HttpException(
          `Could not find client with id: ${editedClient.id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const { id, ...rest } = editedClient;

      if (this.config.get('NODE_ENV') === 'development') {
        await new Promise((r) => setTimeout(r, 1000));
      }

      return await this.prisma.client.update({
        where: {
          id: id,
        },
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async seedClients() {
    try {
      await this.prisma.client.deleteMany({});
      await this.prisma.client.createMany({
        data: clientSeedData(),
      });
    } catch (error) {
      throw error;
    }
  }
}
