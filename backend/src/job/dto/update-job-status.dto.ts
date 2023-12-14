import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { JobStatus } from '@prisma/client';

export const UpdateJobStatusSchema = z.object({
  status: z.enum(
    [JobStatus.CANCELED, JobStatus.COMPLETED, JobStatus.UNDER_MAINTENANCE],
    { required_error: "'status' is required" },
  ),
});

export class UpdateJobStatusDto extends createZodDto(UpdateJobStatusSchema) {}
