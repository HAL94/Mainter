// import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ClientType } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { PaginationSchema } from 'src/common/dto/page.dto';
import { z } from 'zod';

const ClientTypeSchema = z.union([
  z.literal(ClientType.BUSINESS),
  z.literal(ClientType.INDIVIDUAL),
]);

export const ClientPageSchema = PaginationSchema.extend({
  type: ClientTypeSchema.optional(),
});

export class ClientPageDto extends createZodDto(ClientPageSchema) {}
