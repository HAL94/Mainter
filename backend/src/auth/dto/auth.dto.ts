import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateAuthSchema = z.object({
  email: z
    .string({ required_error: "'email' is required" })
    .email("'email' must be a valid email format"),
  password: z
    .string({ required_error: "'password' is required " })
    .min(6, "'password' must be at least 6 characters long"),
});

export class AuthDto extends createZodDto(CreateAuthSchema) {}
