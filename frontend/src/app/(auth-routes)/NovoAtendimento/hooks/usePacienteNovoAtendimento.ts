'use client';
import { useEffect, useState } from 'react';

import { Patient, PatientApiResponse } from '@/src/lib/pacientes';
import { api } from '@/src/services/api';

const PAGE_SIZE = 10;

export function usePacientes(filter: string, status: string, page: number) {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      setIsLoading(true);
      setError(null);

      const params = {
        status: status,
        pageNumber: page,
        pageSize: PAGE_SIZE,
        ...(filter && { filter: filter })
      };

      try {
        const response = await api.get<PatientApiResponse>('/Patient/filter', {
          params
        });
        setPacientes(response.data.data);
        setTotalPages(Math.ceil(response.data.totalRecords / PAGE_SIZE));
      } catch (err) {
        console.error(`Erro ao buscar pacientes:`, err);
        setError('Não foi possível carregar os pacientes.');
        setPacientes([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPacientes();
  }, [filter, status, page]);

  return { pacientes, isLoading, error, totalPages };
}
