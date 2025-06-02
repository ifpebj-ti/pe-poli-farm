import { AxiosError } from 'axios';

import { api } from './api';

export async function Login(email: string, password: string) {
  try {
    const response = await api.post('/Auth', {
      email,
      password
    });
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
  acessCode: string
) {
  // 1. Obter o token do localStorage
  const token = localStorage.getItem('UserAuth');

  // 2. Verificar se o token existe
  if (!token) {
    console.error('Token não encontrado no localStorage.');
    // Você pode querer lançar um erro ou retornar null/false aqui,
    // dependendo da sua lógica de tratamento de erro.
    throw new Error('Token de autenticação não encontrado.');
  }

  // 3. Configurar os cabeçalhos da requisição
  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    // 4. Realizar a requisição PUT com os cabeçalhos
    const response = await api.put(
      `/Auth`,
      {
        email,
        password,
        acessCode
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
