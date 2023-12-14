import { createZodDto } from 'nestjs-zod';
import SortDirectionSchema from 'src/common/schema/sort-direction.schema';
import { z } from 'zod';

export const PaginationSchema = z.object({
  pageNo: z.coerce.number().positive('Must be positive').min(1),
  pageSize: z.coerce.number().positive('Must be positive'),
  query: z.string().optional().default(''),
  orderBy: z.string().optional().default(''),
  order: SortDirectionSchema.optional(),
});

export class PageDto extends createZodDto(PaginationSchema) {}
