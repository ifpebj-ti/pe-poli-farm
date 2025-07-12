// src/types/profissional.ts
export type Profissional = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  position: string; // Ex: DOCTOR, MANAGEMENT
  profile: string; // Ex: DOCTOR, ADMIN
  status: 'Ativo' | 'Inativo'; // Adicionado no frontend para controle
};
