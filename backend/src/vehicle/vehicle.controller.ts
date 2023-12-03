import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { GetCurrentAppId } from 'src/common/decorators/get-current-app-id.decorator';
import { handleApiError } from 'src/common/handle-error';
import { ClientVehicle } from '@prisma/client';
import AppResponse from 'src/common/app-response';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { GetIdDto } from 'src/common/dto/get-id.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { DeleteVehicleDto } from './dto/delete-vehicle.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicles: VehicleService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageInfo: PageDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.vehicles.getAllVehicles(pageInfo, appId);

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
    @GetCurrentAppId() appId: string,
    @Param() data: GetIdDto,
  ): Promise<AppResponse<ClientVehicle>> {
    try {
      const result = await this.vehicles.getOneVehicle(data, appId);
      return {
        success: true,
        error: null,
        message: `got vehicle with id: ${data.id}`,
        data: result,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @GetCurrentAppId() appId: string,
    @Body() data: CreateVehicleDto,
  ): Promise<AppResponse<ClientVehicle>> {
    try {
      const result = await this.vehicles.addVehicle(data, appId);
      return {
        success: true,
        data: result,
        error: null,
        message: 'Created Vehicle Successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/update')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Body() vehicleData: UpdateVehicleDto,
    @GetCurrentAppId() appId: string,
  ) {
    try {
      return await this.vehicles.updateOne(vehicleData, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteOne(
    @Body() vehicleData: DeleteVehicleDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<ClientVehicle>> {
    try {
      const deleted = await this.vehicles.remove(vehicleData, appId);

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
