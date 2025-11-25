import { AxiosError } from 'axios';

import { api } from './api';

export async function GetPatientByCPF(cpf: string) {
  try {
    const response = await api.get(`/Patient/${cpf}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || new Error('Erro ao buscar paciente');
    }

    throw new Error('Erro desconhecido ao buscar paciente');
  }
}
