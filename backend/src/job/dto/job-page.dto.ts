import { JobStatus } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { PaginationSchema } from 'src/common/dto/page.dto';
import { z } from 'zod';

export const JobPageSchema = PaginationSchema.extend({
  clientId: z.coerce
    .number()
    .positive("'clientId' must be positive")
    .optional(),
  vehicleId: z.coerce
    .number()
    .positive("'vehicleId' must be positive")
    .optional(),
  status: z
    .enum([
      JobStatus.CANCELED,
      JobStatus.COMPLETED,
      JobStatus.UNDER_MAINTENANCE,
    ])
    .optional(),
});

export class JobPageDto extends createZodDto(JobPageSchema) {}
