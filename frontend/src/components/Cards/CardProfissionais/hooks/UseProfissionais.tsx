import { useEffect, useState } from 'react';

import { Profissional } from '@/src/lib/profissionais';
import { api } from '@/src/services/api';

export function useProfissionais() {
  // 1. Toda a lógica de estado foi movida para cá
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. A função para buscar os dados também está aqui
  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // A resposta da API não tem 'status', então usamos Omit para tipar corretamente
        const response =
          await api.get<Omit<Profissional, 'status'>[]>('/User/GetAll');

        const profissionaisComStatus = response.data.map((p) => ({
          ...p,
          status: 'Ativo' as const
        }));

        setProfissionais(profissionaisComStatus);
      } catch (err) {
        console.error('Erro ao buscar profissionais:', err);
        setError('Não foi possível carregar os profissionais.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfissionais();
  }, []); // O array vazio garante que a busca ocorra apenas uma vez

  // 3. A função para alterar o estado também foi movida para cá
  const toggleProfissionalStatus = (id: string) => {
    setProfissionais(
      profissionais.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : p
      )
    );
  };

  // 4. O hook retorna tudo que o componente precisa para funcionar
  return {
    profissionais,
    isLoading,
    error,
    toggleProfissionalStatus
  };
}
