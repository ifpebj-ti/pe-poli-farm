'use client';

import { Box, Typography } from '@mui/material';

export default function RelatorioPacienteHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        p: 6,
        backgroundColor: '#fff',
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          color: '#000',
          fontWeight: 500,
          fontFamily: 'Roboto, sans-serif'
        }}
      >
        Informações do Paciente
      </Typography>
      <Box sx={{ display: 'flex', gap: '100px' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#000',
            fontWeight: 500,
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Laura Oliveira
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#000',
            fontWeight: 400,
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          CPF: 123.456.789-10
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#000',
            fontWeight: 400,
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          SUS: 46743674
        </Typography>
      </Box>
    </Box>
  );
}
