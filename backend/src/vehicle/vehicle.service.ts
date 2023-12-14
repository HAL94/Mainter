import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { GetIdDto } from 'src/common/dto/get-id.dto';
import { ConfigService } from '@nestjs/config';
import { DeleteVehicleDto } from './dto/delete-vehicle.dto';
import { VehiclePageDto } from './dto/vehicle-page.dto';
import { convertStringWithDotsToNestedObj } from 'src/utils';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getAllVehicles(pageInfo: VehiclePageDto, appId: string) {
    // console.log('pageInfo', pageInfo);
    const {
      pageNo,
      pageSize,
      query,
      order: direction,
      orderBy: orderKey,
      clientId,
    } = pageInfo;

    const skip = (pageNo - 1) * pageSize;
    const take = pageSize;

    const filteration: any = {
      appId: {
        equals: appId,
      },
      OR: [
        { make: { contains: query, mode: 'insensitive' } },
        { model: { contains: query, mode: 'insensitive' } },
        { plate: { contains: query, mode: 'insensitive' } },
        { year: { contains: query, mode: 'insensitive' } },
        {
          client: {
            fullName: { contains: query, mode: 'insensitive' },
          },
        },
      ],
    };

    if (clientId) {
      filteration.client = {
        id: clientId,
      };
    }

    const orderation: any = {};

    if (orderKey && direction) {
      const orderBy = convertStringWithDotsToNestedObj(orderKey, direction);
      orderation.orderBy = orderBy;
    }

    const dataLength = await this.prisma.clientVehicle.count({
      where: filteration,
      ...orderation,
    });

    const data = await this.prisma.clientVehicle.findMany({
      skip,
      take,
      where: filteration,
      ...orderation,
      include: {
        client: {
          select: {
            fullName: true,
          },
        },
      },
    });

    return {
      table: {
        length: dataLength,
        data,
      },
    };
  }

  async addVehicle(data: CreateVehicleDto, appId: string) {
    try {
      return await this.prisma.clientVehicle.create({
        data: {
          ...data,
          appId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(vehicleData: DeleteVehicleDto, appId: string) {
    try {
      const foundExisting = await this.prisma.clientVehicle.findMany({
        where: {
          appId,
          AND: [
            {
              id: { in: vehicleData.ids },
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

      await this.prisma.clientVehicle.deleteMany({
        where: {
          id: { in: vehicleData.ids },
        },
      });

      return foundExisting;
    } catch (error) {
      throw error;
    }
  }

  async getOneVehicle(data: GetIdDto, appId: string) {
    try {
      const vehicleFound = await this.prisma.clientVehicle.findFirst({
        where: {
          appId: appId,
          AND: [
            {
              id: Number(data.id),
            },
          ],
        },
        include: {
          client: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!vehicleFound) {
        throw new HttpException(
          'Could not find vehicle with provided id',
          HttpStatus.BAD_REQUEST,
        );
      }

      return vehicleFound;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(editedVehicle: UpdateVehicleDto, appId: string) {
    try {
      console.log('body payload', editedVehicle);

      const found = await this.prisma.clientVehicle.findFirst({
        where: { appId, AND: [{ id: editedVehicle.id }] },
      });

      if (!found) {
        throw new HttpException(
          `Could not find vehicle with id: ${editedVehicle.id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const { id, ...rest } = editedVehicle;

      if (this.config.get('NODE_ENV') === 'development') {
        await new Promise((r) => setTimeout(r, 1000));
      }

      return await this.prisma.clientVehicle.update({
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
