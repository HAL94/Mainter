import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  async getAllClients() {
    return new Promise((r) =>
      setTimeout(() => {
        return r([{ name: 'Jason Limbu', mobile: '0563434343' }]);
      }, 1000),
    );
  }
}
