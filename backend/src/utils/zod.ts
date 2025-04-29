import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  addressId: z.string().uuid(),
  phoneNumber: z.string(),
  activate: z.boolean().default(true),
});

export const loginSchema = z.object({});
