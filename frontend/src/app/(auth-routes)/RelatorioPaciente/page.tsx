'use client';

import { useRouter } from 'next/navigation';

import BreadCrumb from '@/src/components/BreadCrumb';
import CardResumoClinico from '@/src/components/Cards/CardResumoClinico';
import RelatorioPacienteHeader from '@/src/components/Headers/HeaderRelatorioPaciente';
import NavBar from '@/src/components/NavBar';
import TabelaRelatorioPaciente from '@/src/components/Tabelas/TabelaRelatorioPaciente';

import { Box, Button, Typography } from '@mui/material';

export default function RelatorioPaciente() {
  const router = useRouter();
  const linkList = [
    {
      label: 'Pacientes',
      href: '/Pacientes'
    },
    {
      label: 'Gerar Relatório',
      href: '#'
    }
  ];

  const handleVoltarClick = () => {
    router.push('/Relatorio');
  };

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 6 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <RelatorioPacienteHeader />
      <CardResumoClinico />
      <Typography
        variant="h4"
        sx={{ fontWeight: 500, color: '#000', mt: 3, ml: 6 }}
      >
        Histórico
      </Typography>
      <TabelaRelatorioPaciente />
      <Button
        variant="outlined"
        onClick={handleVoltarClick}
        sx={{
          width: 'fit-content',
          alignSelf: 'flex-end',
          height: 36,
          borderRadius: '18px',
          textTransform: 'none',
          mx: 6,
          mt: 4,
          px: 3,
          borderColor: '#1351B4',
          color: '#1351B4',
          fontWeight: 400,
          fontFamily: 'Roboto, sans-serif',
          minWidth: 90,
          '&:hover': {
            borderColor: '#0f479e',
            backgroundColor: '#f0f7ff'
          }
        }}
      >
        VOLTAR
      </Button>
    </Box>
  );
}
