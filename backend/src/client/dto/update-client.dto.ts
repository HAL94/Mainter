import { createZodDto } from 'nestjs-zod';
import { CreateClientSchema } from './create-client.dto';

import { z } from 'nestjs-zod/z';

const UpdateClientSchema = CreateClientSchema.extend({
  id: z.number({ required_error: "'id' must be passed" }),
});

export class UpdateClientDto extends createZodDto(UpdateClientSchema) {}
