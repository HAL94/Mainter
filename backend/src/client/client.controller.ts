import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.clientService.getAllClients();
  }
}
