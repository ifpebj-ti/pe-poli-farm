'use client';

import TelaAgendamentoInterna from '@/src/components/Agendamento';
import BreadCrumb from '@/src/components/BreadCrumb';
import NavBar from '@/src/components/NavBar';

import { Box } from '@mui/material';

export default function TelaAgendamento() {
  const linkList = [
    {
      label: 'Agendamento',
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
      <TelaAgendamentoInterna />
    </Box>
  );
}
