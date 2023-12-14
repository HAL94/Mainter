import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const DeleteJobSchema = z.object({
  ids: z.array(
    z.coerce.number({ required_error: "'ids' array must contain numbers" }),
  ),
});

export class DeleteJobDto extends createZodDto(DeleteJobSchema) {}
