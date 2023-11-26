import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getAllClients() {
    return new Promise((r) =>
      setTimeout(() => {
        return r({
          tableHead: {
            en: ['Full Name', 'Mobile', 'Type', 'Code', 'Email'],
            ar: ['الأسم الكامل', 'الجوال', 'نوع العميل', 'الرمز', 'الإيميل'],
          },
          table: {
            length: 20,
            data: [
              {
                id: 1,
                fullName: 'Jason Limbu',
                mobile: '0563434343',
                type: 'Individual',
                code: 'C1',
                email: 'j.limbu@gmail.com',
              },
            ],
          },
        });
      }, 1000),
    );
  }

  async addClient(clientData: CreateClientDto, userId: number) {
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
          ownerId: userId,
          ...clientData,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
