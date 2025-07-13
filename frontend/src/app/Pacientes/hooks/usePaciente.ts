// src/hooks/usePacientes.ts
import { useState, useEffect } from 'react';

import { Patient, PatientApiResponse } from '@/src/lib/pacientes'; // Garanta que o caminho está correto
import { api } from '@/src/services/api';
import { isAxiosError } from 'axios';

/**
 * Hook dinâmico para buscar pacientes com base em um filtro de texto e status.
 * @param filter - O termo de busca para o nome do paciente.
 * @param status - O status do paciente para filtrar (ex: 'NO_SERVICE').
 */
const PAGE_SIZE = 10;
export function usePacientes(filter: string, status: string, page: number) {
  // 1. Os estados continuam aqui dentro.
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // 2. O useEffect agora depende do filtro de texto e do status.
  useEffect(() => {
    const fetchPacientes = async () => {
      setIsLoading(true);
      setError(null);

      // Prepara os parâmetros da API. Status é sempre incluído.
      const params: {
        filter?: string;
        status?: string; // status agora é opcional
        pageNumber: number;
        pageSize: number;
      } = {
        pageNumber: page,
        pageSize: PAGE_SIZE
      };

      // Adiciona o 'filter' apenas se o usuário tiver digitado algo.
      if (filter) {
        params.filter = filter;
      }

      if (status && status !== 'ALL') {
        params.status = status;
      }

      try {
        if (status === 'ALL') {
          const response = await api.get<PatientApiResponse>('/Patient/getAll');
          setPacientes(response.data.data);
          setTotalPages(Math.ceil(response.data.totalRecords / PAGE_SIZE));
        } else {
          const response = await api.get<PatientApiResponse>(
            '/Patient/filter',
            {
              params
            }
          );
          setPacientes(response.data.data);
          setTotalPages(Math.ceil(response.data.totalRecords / PAGE_SIZE));
        }
      } catch (err) {
        console.error(`Erro ao buscar pacientes com status ${status}:`, err);
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao buscar pacientes.');
        } else {
          setError('Ocorreu um erro inesperado.');
        }
        setPacientes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPacientes();
    // 3. A mágica acontece aqui: o hook refaz a busca sempre que 'filter' ou 'status' mudam.
  }, [filter, status, page]);

  // 4. Retorna o estado para o componente consumir.
  return { pacientes, isLoading, error, totalPages };
}
