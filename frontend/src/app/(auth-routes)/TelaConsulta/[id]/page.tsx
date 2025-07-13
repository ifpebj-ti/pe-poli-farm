'use client';

import BreadCrumb from '@/src/components/BreadCrumb';
import TelaConsulta from '@/src/components/Consulta';
import NavBar from '@/src/components/NavBar';

import { Box, Button } from '@mui/material';

export default function ConsultaCompletaPage() {
  const linkList = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Novo Atendimento',
      href: '#'
    }
  ];

  // Estilos para os botões do topo, replicados aqui
  const buttonStyles = {
    borderRadius: '20px',
    fontWeight: 500,
    px: 3,
    minWidth: 130
  };

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />

      {/* Conteúdo abaixo da NavBar: BreadCrumb e Nova Atendimento/Botões */}
      <Box sx={{ mt: 4, ml: 10, mr: 4 }}>
        {' '}
        {/* Adicionado mr para o alinhamento da direita */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          {/* Lado esquerdo: BreadCrumb */}
          <BreadCrumb {...{ linkList }} />

          {/* Lado direito: "Novo Atendimento" e Botões */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                ...buttonStyles,
                backgroundColor: '#1351B4',
                '&:hover': { backgroundColor: '#0f479e' },
                textTransform: 'uppercase'
              }}
            >
              IMPRIMIR
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ ...buttonStyles, textTransform: 'none' }}
            >
              CANCELAR
            </Button>
            <Button
              variant="contained"
              sx={{
                ...buttonStyles,
                backgroundColor: '#0E930B',
                '&:hover': { backgroundColor: '#086506' },
                textTransform: 'none'
              }}
            >
              PROCEDIMENTOS
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Box principal para o conteúdo da consulta, que agora começará com "Dados do paciente" */}
      <Box sx={{ p: 4, pt: 0, bgcolor: '#fff' }}>
        {' '}
        {/* pt: 0 para remover padding top que já foi tratado acima */}
        <TelaConsulta />
      </Box>
    </Box>
  );
}
