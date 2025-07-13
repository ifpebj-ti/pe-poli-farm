import { useState, useEffect } from 'react';

import { Patient } from '@/src/lib/pacientes'; // Reutilize seu tipo Patient
import { api } from '@/src/services/api';

/**
 * Busca os dados de um único paciente usando o CPF.
 * @param cpf - O CPF do paciente a ser buscado.
 */
export function usePacienteCpf(cpf: string) {
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Só faz a busca se o CPF for válido
    if (!cpf) {
      setIsLoading(false);
      return;
    }

    const fetchPaciente = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<Patient>(`/Patient/${cpf}`);
        setPaciente(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados do paciente:', err);
        setError('Não foi possível carregar os dados do paciente.');
        setPaciente(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaciente();
  }, [cpf]); // Roda sempre que o CPF mudar

  return { paciente, isLoading, error };
}
