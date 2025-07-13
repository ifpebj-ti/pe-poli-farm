'use client';

import BreadCrumb from '@/src/components/BreadCrumb';
import NavBar from '@/src/components/NavBar';
import DadosDoPacientePageContent from '@/src/components/Prontuario'; // Corrected import path and component name

import { Box } from '@mui/material';

export default function TelaProntuarioPage() {
  // Renamed the default export to be descriptive of the page
  const linkList = [
    {
      label: 'Pacientes',
      href: '/pacientes' // Example path for a patients list page
    },
    {
      label: 'Nome do Paciente', // This would typically be dynamic (e.g., from URL params)
      href: '#'
    },
    {
      label: '01/04', // This would typically be dynamic (e.g., from URL params or selected date)
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
      <DadosDoPacientePageContent />
    </Box>
  );
}
