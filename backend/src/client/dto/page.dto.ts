// import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ClientType } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import SortDirectionSchema from 'src/common/schema/sort-direction.schema';
import { z } from 'zod';

const ClientTypeSchema = z.union([
  z.literal(ClientType.BUSINESS),
  z.literal(ClientType.INDIVIDUAL),
]);

const PaginationSchema = z.object({
  pageNo: z.coerce.number().positive('Must be positive').min(1),
  pageSize: z.coerce.number().positive('Must be positive'),
  query: z.string().optional().default(''),
  type: ClientTypeSchema.optional(),
  orderBy: z.string().optional().default(''),
  order: SortDirectionSchema.optional(),
});

export class PageDto extends createZodDto(PaginationSchema) {}
