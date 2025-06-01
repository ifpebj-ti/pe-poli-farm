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
  acessCode: string,
) {
  try {
    const response = await api.put(`/Auth`, {
      email,
      password,
      acessCode,
    });
    return response;
  } catch (error) {
    throw error;
  }
}