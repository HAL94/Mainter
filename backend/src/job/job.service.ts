import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { GetIdDto } from 'src/common/dto/get-id.dto';
import { JobPageDto } from './dto/job-page.dto';
import { DeleteJobDto } from './dto/delete-job.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { convertStringWithDotsToNestedObj } from 'src/utils';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async getAllJobs(pageInfo: JobPageDto, appId: string) {
    console.log('pageInfo', pageInfo);
    const {
      pageNo,
      pageSize,
      query,
      order: direction,
      orderBy: orderKey,
      clientId,
      vehicleId,
      status,
    } = pageInfo;

    const skip = (pageNo - 1) * pageSize;
    const take = pageSize;

    const filteration: any = {
      appId: {
        equals: appId,
      },
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        {
          client: {
            fullName: { contains: query, mode: 'insensitive' },
          },
        },
        {
          orderNumber: isNaN(parseInt(query))
            ? {}
            : { equals: parseInt(query) },
        },
      ],
    };

    if (clientId) {
      filteration.client = {
        id: clientId,
      };
    }
    if (vehicleId) {
      filteration.vehicle = {
        id: vehicleId,
      };
    }
    if (status) {
      filteration.status = status;
    }

    const orderation: any = {};

    if (orderKey && direction) {
      const orderBy = convertStringWithDotsToNestedObj(orderKey, direction);
      orderation.orderBy = orderBy;
    }

    const dataLength = await this.prisma.job.count({
      where: filteration,
      ...orderation,
    });

    const data = await this.prisma.job.findMany({
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

  async addJob(data: CreateJobDto, appId: string): Promise<Job> {
    try {
      return await this.prisma.job.create({
        data: {
          ...data,
          appId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(jobData: DeleteJobDto, appId: string) {
    try {
      const foundExisting = await this.prisma.job.findMany({
        where: {
          appId,
          AND: [
            {
              id: { in: jobData.ids },
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

      await this.prisma.job.deleteMany({
        where: {
          id: { in: jobData.ids },
        },
      });

      return foundExisting;
    } catch (error) {
      throw error;
    }
  }

  async getOneJob(data: GetIdDto, appId: string) {
    try {
      const found = await this.prisma.job.findFirst({
        where: {
          appId,
          AND: [{ id: { equals: Number(data.id) } }],
        },
        include: {
          client: {
            select: {
              fullName: true,
            },
          },
          vehicle: {
            select: {
              make: true,
              model: true,
              year: true,
              engineNo: true,
              plate: true,
            },
          },
        },
      });

      if (!found) {
        throw new HttpException(
          'Could not find job with provided id',
          HttpStatus.BAD_REQUEST,
        );
      }

      return found;
    } catch (error) {
      throw error;
    }
  }

  async updateOneJobStatus(
    data: UpdateJobStatusDto,
    param: GetIdDto,
    appId: string,
  ) {
    try {
      const found = await this.prisma.job.findFirst({
        where: {
          id: Number(param.id),
          AND: [{ appId: { equals: appId } }],
        },
      });

      if (!found) {
        throw new HttpException(
          'Could not find job with provided id',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.job.update({
        where: {
          id: Number(param.id),
        },
        data: {
          status: data.status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(data: UpdateJobDto, appId: string) {
    try {
      const found = await this.prisma.job.findFirst({
        where: {
          appId,
          AND: [{ id: data.id }],
        },
      });

      if (!found) {
        throw new HttpException(
          'Could not find job with provided id',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.job.update({
        where: {
          id: found.id,
        },
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
