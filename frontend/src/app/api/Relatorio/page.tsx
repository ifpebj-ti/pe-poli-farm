import BreadCrumb from '@/src/components/BreadCrumb';
import RelatorioHeader from '@/src/components/Headers/HeaderRelatorio';
import NavBar from '@/src/components/NavBar';
import TabelaRelatorio from '@/src/components/Tabelas/TabelaRelatorio';

import { Box } from '@mui/material';

export default function Relatorio() {
  const linkList = [
    {
      label: 'Relatório do Paciente',
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
      <RelatorioHeader />
      <TabelaRelatorio />
    </Box>
  );
}
