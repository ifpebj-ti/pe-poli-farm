import FormDadosPaciente from '@/src/components/FormDadosPaciente';
import NavBar from '@/src/components/NavBar';
import { Box } from '@mui/material';
import React from 'react';

export default function NovoPaciente() {
  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <FormDadosPaciente />
    </Box>
  );
}
