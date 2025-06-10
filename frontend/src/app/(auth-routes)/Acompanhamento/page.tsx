import BreadCrumb from '@/src/components/BreadCrumb';
import AcompanhamentoHeader from '@/src/components/Headers/HeaderAcompanhamento';
import NavBar from '@/src/components/NavBar';
import TabelaAcompanhamento from '@/src/components/Tabelas/TabelaAcompanhamento';

import { Box } from '@mui/material';

export default function Acompanhamento() {
  const linkList = [
    {
      label: 'Acompanhamento',
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
      <AcompanhamentoHeader />
      <TabelaAcompanhamento />
    </Box>
  );
}
