'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import PacientesHeader from '@/src/components/Headers/Headerpacientes';
import NavBar from '@/src/components/NavBar';
import TabelaPacientes from '@/src/components/Tabelas/TabelaPacientes';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useDebounce } from './hooks/useDebounce';
import { usePacientes } from './hooks/usePaciente';

export default function Pacientes() {
  const linkList = [
    {
      label: 'Pacientes',
      href: '#'
    }
  ];

  // --- ESTADOS DA UI ---
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [statusFiltro, setStatusFiltro] = useState<string>('ALL');
  // -> NOVO: Estado para controlar a página atual
  const [page, setPage] = useState(1);

  const debouncedBusca = useDebounce(termoBusca, 500);

  // --- LÓGICA DE DADOS ---
  // -> ALTERAÇÃO: Passa o estado 'page' para o hook e recebe 'totalPages'
  const { pacientes, isLoading, error, totalPages } = usePacientes(
    debouncedBusca,
    statusFiltro,
    page
  );

  // -> NOVO: Efeito para resetar a paginação ao mudar os filtros
  useEffect(() => {
    setPage(1);
  }, [debouncedBusca, statusFiltro]);

  // --- HANDLERS ---
  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setStatusFiltro(newStatus);
    }
    if (newStatus === null) {
      setStatusFiltro(''); // Reset para o status padrão
    }
  };

  // -> NOVO: Handler para mudar de página
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
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
        statusFiltro={statusFiltro}
        onStatusChange={handleStatusChange}
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
      {!isLoading && !error && (
        <TabelaPacientes
          pacientes={pacientes}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
}
