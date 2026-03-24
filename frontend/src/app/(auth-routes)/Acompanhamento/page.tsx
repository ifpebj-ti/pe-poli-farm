'use client';
import { useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import AcompanhamentoHeader from '@/src/components/Headers/HeaderAcompanhamento';
import NavBar from '@/src/components/NavBar';
import TabelaAcompanhamento from '@/src/components/Tabelas/TabelaAcompanhamento';

import { useAppointments } from '@/src/hooks/useAppointments';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Acompanhamento() {
  const [status, setStatus] = useState('');
  const [inputData, setInputData] = useState('');

  const { appointments, isLoading, error } = useAppointments();

  const linkList = [
    {
      label: 'Acompanhamento',
      href: '#'
    }
  ];

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 6 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <AcompanhamentoHeader {...{ status, setStatus, setInputData }} />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Buscando acompanhamentos...</Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      {!isLoading && !error && (
        <TabelaAcompanhamento {...{ status, inputData, appointments }} />
      )}
    </Box>
  );
}
