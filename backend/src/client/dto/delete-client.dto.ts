import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const DeleteClientSchema = z.object({
  ids: z.array(
    z.coerce.number({ required_error: "'ids' array must contain numbers" }),
  ),
});

export class DeleteClientDto extends createZodDto(DeleteClientSchema) {}
