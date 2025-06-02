'use client';
import MeusDadosForm from '@/src/components/Meusdados/page';
import NavBar from '@/src/components/NavBar';

import { Box } from '@mui/material';

export default function MeusDados() {
  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <MeusDadosForm />
    </Box>
  );
}
