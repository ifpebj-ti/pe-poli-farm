import { z } from 'zod';

export const mySchema = z
  .object({
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Email Inválido'),
    accessCode: z.string({ required_error: 'Campo obrigatório' }),
    password: z.string({ required_error: 'Campo obrigatório' }),
    repeatPassword: z.string().min(1, { message: 'Senha obrigatória' })
  })
  .required()
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não conferem',
    path: ['repeatPassword']
  });

export type typeMyschema = z.infer<typeof mySchema>;
