import { api } from './api';

export async function FindUserByEmail(email: string) {
  const response = await api.get('/Auth', {
    params: { email }
    // withCredentials: true // ESSENCIAL pra cookies!
  });

  return response.data;
}

export async function PutUser(data: {
  email: string;
  accessCode: string;
  password: string;
}) {
  const response = await api.put('/Auth', data, {
    // withCredentials: true // ESSENCIAL pra cookies!
  });

  return response.data;
}

export async function PostUser(data: {
  name: string;
  email: string;
  cpf: string;
  position: string;
  profile: {
    role: string;
  };
}) {
  const response = await api.post('/User', data);

  return response.data;
}

// Tipagem para os dados que o admin pode atualizar
export type AdminUpdateUserData = {
  name?: string;
  email?: string;
  isActive?: boolean;
  profileId?: string;
};

/**
 * Atualiza os dados de um usuário (requer permissão de Admin).
 * @param userId - O ID do usuário a ser atualizado.
 * @param data - Os dados a serem atualizados.
 */
export async function AdminUpdateUser(
  userId: string,
  data: AdminUpdateUserData
) {
  const response = await api.put(`/User/${userId}`, data);
  return response.data;
}
