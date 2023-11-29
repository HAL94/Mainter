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
import { PageDto } from './dto';
import { CreateClientDto } from './dto/create-client.dto';
import { GetCurrentUserId, Public } from 'src/common/decorators';

import { handleApiError } from 'src/common/handle-error';
import AppResponse from 'src/common/app-response';
import { DeleteClientDto } from './dto/delete-client.dto';
import { Client } from '@prisma/client';
import { GetClientDto } from './dto/get-one-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageInfo: PageDto,
    @GetCurrentUserId() userId: number,
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.clientService.getAllClients(pageInfo, userId);

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
    @Param() getOneInfo: GetClientDto,
    @GetCurrentUserId() userId: number,
  ): Promise<AppResponse<any>> {
    try {
      const data = await this.clientService.getOneClient(getOneInfo, userId);

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
    @GetCurrentUserId() id: number,
  ): Promise<AppResponse<any>> {
    try {
      const result = await this.clientService.addClient(clientData, id);
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
    @GetCurrentUserId() id: number,
  ) {
    try {
      return await this.clientService.updateOne(clientData, id);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteOne(
    @Body() clientData: DeleteClientDto,
    @GetCurrentUserId() userId: number,
  ): Promise<AppResponse<Client>> {
    try {
      const deleted = await this.clientService.remove(clientData, userId);

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

  @Public()
  @Post('/seed')
  @HttpCode(HttpStatus.ACCEPTED)
  async seedClients() {
    try {
      await this.clientService.seedClients();
    } catch (error) {
      return handleApiError(error);
    }
  }
}
