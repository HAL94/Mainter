import { createZodDto } from 'nestjs-zod';
import { PaginationSchema } from 'src/common/dto/page.dto';
import { z } from 'zod';

export const VehiclePageSchema = PaginationSchema.extend({
  clientId: z.coerce
    .number()
    .positive("'clientId' must be positive")
    .optional(),
});

export class VehiclePageDto extends createZodDto(VehiclePageSchema) {}
