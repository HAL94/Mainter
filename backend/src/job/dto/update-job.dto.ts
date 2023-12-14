import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UpdateJobSchema = z.object({
  id: z.coerce
    .number({ required_error: "'id' is required " })
    .positive("'id' must be positive"),
  title: z.string({ required_error: "'title' field is required" }),
  description: z.string({ required_error: "'description' field is required" }),
  ownerId: z.coerce.number({
    required_error: "'clientId' is a required field",
  }),
  vehicleId: z.coerce.number({
    required_error: "'vehicleId' is a required field",
  }),
  works: z.array(
    z.object({
      work: z.string({ required_error: "'work' title is required" }),
      cost: z.number({ required_error: "'cost' is a required field" }),
    }),
  ),
});

export class UpdateJobDto extends createZodDto(UpdateJobSchema) {}
