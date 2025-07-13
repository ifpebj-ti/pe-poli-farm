'use client';

import React from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import NavBar from '@/src/components/NavBar';
import DadosDoPacientePageContent from '@/src/components/Prontuario'; // Corrected import path and component name

import { Box, CircularProgress, Typography } from '@mui/material';

import { usePacienteCpf } from './hooks/usePacienteCpf';

type ProntuarioPageProps = {
  params: Promise<{
    cpf: string;
  }>;
};

export default function TelaProntuarioPage({ params }: ProntuarioPageProps) {
  const resolvedParams = React.use(params);
  const { cpf } = resolvedParams;
  const { paciente, isLoading, error } = usePacienteCpf(cpf);

  // Renamed the default export to be descriptive of the page
  const linkList = [
    {
      label: 'Pacientes',
      href: '/Pacientes' // Example path for a patients list page
    },
    {
      label: paciente ? paciente.name : 'Carregando...', // This would typically be dynamic (e.g., from URL params)
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
      {/* 4. Gerencia os estados de carregamento e erro */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>
            Carregando dados do paciente...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 10, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {/* 5. Se tudo estiver ok, renderiza o conteúdo e passa os dados do paciente */}
      {!isLoading && !error && paciente && (
        <DadosDoPacientePageContent paciente={paciente} />
      )}
    </Box>
  );
}
