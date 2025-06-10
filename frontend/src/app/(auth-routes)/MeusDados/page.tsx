'use client';
import BreadCrumb from '@/src/components/BreadCrumb';
import MeusDadosForm from '@/src/components/Meusdados';
import NavBar from '@/src/components/NavBar';

import { Box } from '@mui/material';

export default function MeusDados() {
  const linkList = [
    {
      label: 'Meus Dados',
      href: '#'
    }
  ];

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 10 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <MeusDadosForm />
    </Box>
  );
}
