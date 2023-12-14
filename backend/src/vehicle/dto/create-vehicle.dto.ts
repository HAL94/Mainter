import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateVehicleSchema = z.object({
  ownerId: z.coerce
    .number({ required_error: "'ownerId' field is required" })
    .positive('Must be positive'),
  make: z
    .string({ required_error: "'make' field is required" })
    .min(1, "'make' must have at least one character"),
  model: z
    .string({ required_error: "'model' field is required" })
    .min(1, "'model' must have at least one character"),
  year: z
    .string({ required_error: "'year' field is required" })
    .regex(/^\d{4}$/, "'year' must be 4-digit"),
  plate: z
    .string()
    .regex(
      /^[A-Za-z]{3}-\d{4}$/,
      "'plate' format is invalid. Example for valid format: 'ABC-1234'",
    ),
  engineNo: z.string(),
});

export class CreateVehicleDto extends createZodDto(CreateVehicleSchema) {}
