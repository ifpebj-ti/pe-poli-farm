'use client';

import BreadCrumb from '@/src/components/BreadCrumb';
import EstatisticasSistemaInterna from '@/src/components/Estatistica';
import NavBar from '@/src/components/NavBar';

import { Box } from '@mui/material';

export default function EstatisticasSistema() {
  const linkList = [
    {
      label: 'Estatísticas',
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
      <EstatisticasSistemaInterna />
    </Box>
  );
}
