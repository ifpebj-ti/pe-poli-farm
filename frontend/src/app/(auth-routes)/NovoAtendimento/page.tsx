'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import NovoAtendimentoHeader from '@/src/components/Headers/HeaderNovoAtendimento';
import NavBar from '@/src/components/NavBar';
import TabelaNovoAtendimento from '@/src/components/Tabelas/TabelaNovoAtendimento';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useDebounce } from '../Pacientes/hooks/useDebounce';
import { usePacientes } from './hooks/usePacienteNovoAtendimento';

export default function NovoAtendimento() {
  const router = useRouter();

  const linkList = [
    {
      label: 'Novo Atendimento',
      href: '#'
    }
  ];

  // --- Estados da UI ---
  const [termoBusca, setTermoBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('NO_SERVICE'); // Começa com o primeiro filtro
  const [page, setPage] = useState(1);
  const debouncedBusca = useDebounce(termoBusca, 500);

  // --- Lógica de Dados ---
  const { pacientes, isLoading, error, totalPages } = usePacientes(
    debouncedBusca,
    statusFiltro,
    page
  );

  // Efeito para resetar a página ao mudar filtros
  useEffect(() => {
    setPage(1);
  }, [debouncedBusca, statusFiltro]);

  // --- Handlers ---
  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTermoBusca(e.target.value);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => setPage(newPage);
  const handleVerProntuario = (pacienteCPF: string) =>
    router.push(`/Prontuario/${pacienteCPF}`);
  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setStatusFiltro(newStatus);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: '100vh',
        minWidth: '100%'
      }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 6 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <NovoAtendimentoHeader
        termoBusca={termoBusca}
        onBuscaChange={handleBuscaChange}
        statusFiltro={statusFiltro}
        onStatusChange={handleStatusChange}
      />
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Buscando pacientes...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TabelaNovoAtendimento
            pacientes={pacientes}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onVerProntuario={handleVerProntuario}
          />
        )}
      </Box>
    </Box>
  );
}
