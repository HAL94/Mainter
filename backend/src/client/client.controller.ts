import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Body,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { PageDto } from './dto';
import { CreateClientDto } from './dto/create-client.dto';
import { GetCurrentUserId } from 'src/common/decorators';

import { handleApiError } from 'src/common/handle-error';
import AppResponse from 'src/common/app-response';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() pageInfo: PageDto): Promise<AppResponse<any>> {
    try {
      console.log('pageInfo', pageInfo);
      const data = await this.clientService.getAllClients();

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
}
