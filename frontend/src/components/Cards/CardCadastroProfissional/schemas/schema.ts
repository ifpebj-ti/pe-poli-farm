import { z } from 'zod';

// Reutilizamos as opções dos selects para garantir que os valores são válidos.
// Você pode importar estas constantes do seu componente ou de um arquivo de constantes compartilhado.
const positionOptions = [
  'RECEPTION',
  'MANAGEMENT',
  'DOCTOR',
  'NURSE',
  'NURSING_TECHNICIAN',
  'PHYSIOTHERAPIST',
  'PSYCHOLOGIST',
  'NUTRITIONIST',
  'PHARMACEUTICAL',
  'OCCUPATIONAL_THERAPIST',
  'BIOCHEMICAL',
  'X_RAY_TECHNICIAN',
  'LABORATORY_TECHNICIAN'
] as const; // O 'as const' é importante para o Zod enum funcionar bem.

const roleOptions = [
  'ADMIN',
  'RECEPTIONTEAM',
  'DOCTOR',
  'NURSE',
  'INTITUATIONMANAGEMENT'
] as const;

// Schema de validação para o formulário de cadastro de usuário
export const cadastroUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),

  email: z.string().email('Formato de e-mail inválido.'),

  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'CPF deve estar no formato 000.000.000-00.'
    )
    .or(
      z.string().length(11, 'CPF deve conter 11 dígitos se não for formatado.')
    ),

  position: z.enum(positionOptions, {
    errorMap: () => ({ message: 'Por favor, selecione um cargo válido.' })
  }),

  profile: z.object({
    role: z.enum(roleOptions, {
      errorMap: () => ({
        message: 'Por favor, selecione um perfil de acesso válido.'
      })
    })
  })
});

// Exportamos também o tipo inferido do schema.
// Isso garante que os dados do nosso formulário sempre terão o mesmo tipo do nosso schema.
export type CadastroUserSchema = z.infer<typeof cadastroUserSchema>;
