import BreadCrumb from '@/src/components/BreadCrumb';
import HistoricoExamesHeader from '@/src/components/Headers/HeaderHistoricoExames';
import NavBar from '@/src/components/NavBar';
import TabelaHistoricoExames from '@/src/components/Tabelas/TabelaHistoricoExames';

import { Box } from '@mui/material';

export default function HistoricoExames() {
  const linkList = [
    {
      label: 'Histórico de Exames',
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
      <HistoricoExamesHeader />
      <TabelaHistoricoExames />
    </Box>
  );
}
