import { z } from 'zod';

export const mySchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é obrigatório.' })
    .email('Formato de e-mail inválido.')
    .min(1, 'O e-mail é obrigatório.'),
  password: z
    .string({ required_error: 'A senha é obrigatória.' })
    .min(1, 'A senha é obrigatória.')
});

export type typeMyschema = z.infer<typeof mySchema>;