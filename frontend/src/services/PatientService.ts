import { AxiosError } from 'axios';

import { api } from './api';

interface FilterParams {
  filter?: string;
  status?: string;
  pageNumber?: number;
  pageSize?: number;
}

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

// Adotando o mesmo padrão de objeto de outros serviços
export const PatientService = {
  async filter(params: FilterParams = {}) {
    // Não definir valores padrão de string vazia para que sejam omitidos se não forem fornecidos
    const { filter, status, pageNumber = 1, pageSize = 10 } = params;
    try {
      const response = await api.get('/Patient/filter', {
        params: {
          filter,
          status,
          pageNumber,
          pageSize
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const response = await api.get('/Patient/GetAll');
      return response.data;
    } catch (error) {
      console.error('Error fetching all patients:', error);
      throw error;
    }
  }
};
