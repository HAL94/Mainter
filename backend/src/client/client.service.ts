import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ClientPageDto } from './dto';
import { DeleteClientDto } from './dto/delete-client.dto';

import { UpdateClientDto } from './dto/update-client.dto';
import { GetIdDto } from 'src/common/dto/get-id.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getAllClients(pageInfo: ClientPageDto, appId: string) {
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
      appId: {
        equals: appId,
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

  async addClient(clientData: CreateClientDto, appId: string) {
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
          appId,
          ...clientData,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(clientData: DeleteClientDto, appId: string) {
    try {
      const foundExisting = await this.prisma.client.findMany({
        where: {
          appId,
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

  async getOneClient(getClient: GetIdDto, appId: string) {
    try {
      const found = await this.prisma.client.findFirst({
        where: { appId, AND: [{ id: Number(getClient.id) }] },
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

  async updateOne(editedClient: UpdateClientDto, appId: string) {
    try {
      console.log('body payload', editedClient);

      const found = await this.prisma.client.findFirst({
        where: { appId, AND: [{ id: editedClient.id }] },
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
}
