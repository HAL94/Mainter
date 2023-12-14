import { ClientType } from '@prisma/client';

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateClientSchema = z.object({
  fullName: z.string({ required_error: "'fullName' field is required" }),
  type: z.enum([ClientType.BUSINESS, ClientType.INDIVIDUAL], {
    invalid_type_error: "Type must be one either 'Business' or 'Individual'",
    required_error: "'type' field is required",
  }),
  businessName: z.string().optional().nullable(),
  mobile: z
    .string()
    .regex(
      /^((\+|00)966|0)?5\d{8}$/,
      'Mobile Number is not a valid Saudi Number',
    ),
  email: z.string().email("Field 'email' is invalid"),
});
// .refine(
//   (schema) => {
//     return !(
//       schema.type === ClientType.BUSINESS &&
//       (!schema.businessName || schema.businessName === '')
//     );
//   },
//   { message: "'businessName' is required if 'type' is 'Business'" },
// );

export class CreateClientDto extends createZodDto(
  CreateClientSchema.refine(
    (schema) => {
      return !(
        schema.type === ClientType.BUSINESS &&
        (!schema.businessName || schema.businessName === '')
      );
    },
    { message: "'businessName' is required if 'type' is 'Business'" },
  ),
) {}
