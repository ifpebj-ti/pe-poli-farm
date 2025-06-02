import PacientesHeader from '@/src/components/Headerpacientes';
import NavBar from '@/src/components/NavBar';
import TabelaPacientes from '@/src/components/TabelaPacientes';

import { Box } from '@mui/material';

export default function Pacientes() {
  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <PacientesHeader />
      <TabelaPacientes />
    </Box>
  );
}
