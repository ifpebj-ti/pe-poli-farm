// /components/FormDadosPaciente/FormDadosPaciente.schema.ts

import { z } from 'zod';

// Schema para um único contato de emergência
const emergencyContactSchema = z.object({
  name: z.string().min(1, 'O nome do contato é obrigatório.'),
  phone: z.string().min(10, 'O telefone do contato é obrigatório.'),
  relationship: z.string().min(1, 'O parentesco é obrigatório.')
});

// Schema para o endereço
const addressSchema = z.object({
  cep: z.string().min(8, 'O CEP é obrigatório.'),
  city: z.string().min(1, 'A cidade é obrigatória.'),
  neighborhood: z.string().min(1, 'O bairro é obrigatório.'),
  street: z.string().min(1, 'A rua é obrigatória.'),
  number: z.string().min(1, 'O número é obrigatório.') // Trataremos como string no form e converteremos no envio
});

// Schema principal do paciente
export const patientSchema = z.object({
  name: z.string().min(3, 'O nome completo é obrigatório.'),
  socialName: z.string().optional(),
  birthDate: z.string().min(1, 'A data de nascimento é obrigatória.'), // Zod pode validar datas, mas string do input 'date' é mais simples
  sus: z.string().optional(),
  cpf: z.string(),
  rg: z.string().optional(),
  phone: z.string().min(10, 'O telefone é obrigatório.'),
  motherName: z.string().min(3, 'O nome da mãe é obrigatório.'),
  address: addressSchema,
  emergencyContactDetails: z
    .array(emergencyContactSchema)
    .min(1, 'Pelo menos um contato de emergência é necessário.')
});

// --- Tipagem Inferida pelo Zod ---
// Criamos um tipo TypeScript automaticamente a partir do schema.
// Qualquer mudança no schema será refletida no tipo!
export type PatientFormData = z.infer<typeof patientSchema>;

// --- Estado Inicial Tipado ---
// Nosso estado inicial agora obedece à tipagem do PatientFormData.
export const initialState: PatientFormData = {
  name: '',
  socialName: '',
  birthDate: '',
  sus: '',
  cpf: '',
  rg: '',
  phone: '',
  motherName: '',
  address: {
    cep: '',
    street: '',
    city: '',
    number: '',
    neighborhood: ''
  },
  emergencyContactDetails: [
    {
      name: '',
      phone: '',
      relationship: ''
    }
  ]
};
