import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import { CreateVehicleSchema } from './create-vehicle.dto';

export class UpdateVehicleDto extends createZodDto(
  CreateVehicleSchema.extend({
    id: z.coerce.number({ required_error: "'id' field is required " }),
  }),
) {}
