import BreadCrumb from '@/src/components/BreadCrumb';
import PacientesHeader from '@/src/components/Headerpacientes';
import NavBar from '@/src/components/NavBar';
import TabelaPacientes from '@/src/components/TabelaPacientes';

import { Box } from '@mui/material';

export default function Pacientes() {
  const linkList = [
    {
      label: 'Pacientes',
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
      <PacientesHeader />
      <TabelaPacientes />
    </Box>
  );
}
