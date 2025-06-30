'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import PacientesHeader from '@/src/components/Headers/Headerpacientes';
import NavBar from '@/src/components/NavBar';
import TabelaPacientes from '@/src/components/Tabelas/TabelaPacientes';

import { Patient, PatientApiResponse } from '@/src/lib/pacientes';
import { api } from '@/src/services/api';
import { Box, CircularProgress, Typography } from '@mui/material';
import { isAxiosError } from 'axios';

import { useDebounce } from './hooks/useDebounce';

export default function Pacientes() {
  const linkList = [
    {
      label: 'Pacientes',
      href: '#'
    }
  ];

  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState<string>('');

  const debouncedBusca = useDebounce(termoBusca, 500);

  useEffect(() => {
    // -> LÓGICA ALTERADA DENTRO DESTA FUNÇÃO <-
    console.log(
      `[DEBUG PACIENTES] 🕵️‍♂️ useEffect disparado com busca: "${debouncedBusca}"`
    );
    const fetchPacientes = async () => {
      setIsLoading(true);
      setError(null);

      // 1. Prepara um objeto de parâmetros dinâmico
      const params: {
        filter?: string;
        status?: string;
        pageNumber: number;
        pageSize: number;
      } = {
        pageNumber: 1,
        pageSize: 10
      };

      // 2. Adiciona o filtro apenas se houver um termo de busca
      if (debouncedBusca) {
        params.filter = debouncedBusca;
        params.status = 'Active'; // Opcional: manter o status na busca
      }
      console.log(
        '[DEBUG PACIENTES] ➡️ Parâmetros enviados para a API:',
        params
      );
      try {
        // 3. A chamada à API usa o objeto de parâmetros dinâmico
        const response = await api.get<PatientApiResponse>('/Patient/filter', {
          params
        });
        console.log(
          '[DEBUG PACIENTES] ✅ API respondeu com sucesso:',
          response.data
        );
        setPacientes(response.data.data);
      } catch (err) {
        console.error(
          '[DEBUG PACIENTES] ❌ Ocorreu um erro na chamada da API:',
          err
        );
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
    // O useEffect agora roda na primeira renderização e sempre que a busca (debounced) mudar.
  }, [debouncedBusca]);

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 6 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <PacientesHeader
        termoBusca={termoBusca}
        onBuscaChange={handleBuscaChange}
      />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Buscando pacientes...</Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      {!isLoading && !error && <TabelaPacientes pacientes={pacientes} />}
    </Box>
  );
}
