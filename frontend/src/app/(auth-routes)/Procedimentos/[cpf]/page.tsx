import NavBar from '@/src/components/NavBar';
import RegistroProcedimentos from '@/src/components/RegistroProcedimentos';

import { Box } from '@mui/material';

export default function RegistroProcedimentosPage() {
  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <RegistroProcedimentos />
    </Box>
  );
}
