import { getSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import { api } from './api';

export async function Login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_INTERNAL_API_URL || process.env.NEXT_PUBLIC_BASE_URL}/Auth`,
      {
        email,
        password
      }
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || new Error('Erro ao realizar login');
    }

    throw new Error('Erro desconhecido ao realizar login');
  }
}

export async function NewPassword(
  email: string,
  password: string,
  accessCode: string
) {
  // 1. Obter o token do localStorage
  const session = await getSession();

  if (!session?.user?.accessToken) {
    throw new Error('Token de autenticação não encontrado.');
  }

  // 3. Configurar os cabeçalhos da requisição
  const headers = {
    Authorization: `Bearer ${session.user.accessToken}`
  };

  try {
    // 4. Realizar a requisição PUT com os cabeçalhos
    const response = await api.put(
      `/Auth`,
      {
        email,
        password,
        accessCode
      },
      {
        headers // Adiciona os cabeçalhos à requisição
      }
    );

    return response;
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
    // Trate o erro conforme a necessidade da sua aplicação
    throw error; // Re-lança o erro para que quem chamou a função possa tratá-lo
  }
}
