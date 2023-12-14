import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { GetCurrentAppId } from 'src/common/decorators/get-current-app-id.decorator';
import { handleApiError } from 'src/common/handle-error';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { GetIdDto } from 'src/common/dto/get-id.dto';
import AppResponse from 'src/common/app-response';
import { JobPageDto } from './dto/job-page.dto';
import { Job } from '@prisma/client';
import { DeleteJobDto } from './dto/delete-job.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private jobs: JobService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageInfo: JobPageDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.jobs.getAllJobs(pageInfo, appId);

      return {
        success: true,
        error: null,
        message: 'vehicles retrieved',
        data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param() getOneInfo: GetIdDto,
    @GetCurrentAppId() appId: string,
  ) {
    try {
      return await this.jobs.getOneJob(getOneInfo, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @GetCurrentAppId() appId: string,
    @Body() data: CreateJobDto,
  ) {
    try {
      return await this.jobs.addJob(data, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/update')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Body() jobData: UpdateJobDto,
    @GetCurrentAppId() appId: string,
  ) {
    try {
      return await this.jobs.updateOne(jobData, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/status/:id')
  @HttpCode(HttpStatus.OK)
  async updateJobStatus(
    @Param() param: GetIdDto,
    @Body() data: UpdateJobStatusDto,
    @GetCurrentAppId() appId: string,
  ) {
    try {
      return await this.jobs.updateOneJobStatus(data, param, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteOne(
    @Body() vehicleData: DeleteJobDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<Job>> {
    try {
      const deleted = await this.jobs.remove(vehicleData, appId);

      const message = `Successfully deleted vehicle records with ids: [${deleted
        .map((r) => r.id)
        .join(', ')}]`;

      return {
        success: true,
        error: null,
        message,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}
