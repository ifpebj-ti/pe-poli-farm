import { z } from 'zod';

export const mySchema = z
  .object({
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Email Inválido'),
    password: z.string({ required_error: 'Campo obrigatório' })
  })
  .required();

export type typeMyschema = z.infer<typeof mySchema>;