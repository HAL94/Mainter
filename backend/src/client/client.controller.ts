import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientPageDto } from './dto';
import { CreateClientDto } from './dto/create-client.dto';

import { handleApiError } from 'src/common/handle-error';
import AppResponse from 'src/common/app-response';
import { DeleteClientDto } from './dto/delete-client.dto';
import { Client } from '@prisma/client';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetCurrentAppId } from 'src/common/decorators/get-current-app-id.decorator';
import { GetIdDto } from 'src/common/dto/get-id.dto';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageInfo: ClientPageDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.clientService.getAllClients(pageInfo, appId);

      return {
        success: true,
        error: null,
        message: 'clients retrieved',
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
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.clientService.getOneClient(getOneInfo, appId);

      return {
        success: true,
        error: null,
        message: `got client with id: ${data.id}`,
        data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Body() clientData: CreateClientDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<any>> {
    try {
      const result = await this.clientService.addClient(clientData, appId);
      return {
        success: true,
        data: result,
        error: null,
        message: 'Created Client Successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/update')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Body() clientData: UpdateClientDto,
    @GetCurrentAppId() appId: string,
  ) {
    try {
      return await this.clientService.updateOne(clientData, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteOne(
    @Body() clientData: DeleteClientDto,
    @GetCurrentAppId() appId: string,
  ): Promise<AppResponse<Client>> {
    try {
      const deleted = await this.clientService.remove(clientData, appId);

      const message = `Successfully deleted client records with ids: [${deleted
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
