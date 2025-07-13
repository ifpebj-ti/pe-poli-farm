// src/hooks/usePacientes.ts
import { useState, useEffect } from 'react';

import { Patient } from '@/src/lib/pacientes'; // Garanta que o caminho está correto
import { api } from '@/src/services/api';
import { isAxiosError } from 'axios';

/**
 * Hook dinâmico para buscar pacientes com base em um filtro de texto e status.
 * @param filter - O termo de busca para o nome do paciente.
 * @param status - O status do paciente para filtrar (ex: 'NO_SERVICE').
 */
export function usePacientes() {
  // 1. Os estados continuam aqui dentro.
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. O useEffect agora depende do filtro de texto e do status.
  useEffect(() => {
    const fetchPacientes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // -> ALTERAÇÃO: Chamada única e direta para o endpoint getAll
        const response = await api.get<Patient[]>('/Patient/getAll');
        setPacientes(response.data);
      } catch (err) {
        console.error('Erro ao buscar todos os pacientes:', err);
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
  }, []);

  // 4. Retorna o estado para o componente consumir.
  return { pacientes, isLoading, error };
}
