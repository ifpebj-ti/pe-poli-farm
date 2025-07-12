import BreadCrumb from '@/src/components/BreadCrumb';
import NovoAtendimentoHeader from '@/src/components/Headers/HeaderNovoAtendimento';
import NavBar from '@/src/components/NavBar';
import TabelaNovoAtendimento from '@/src/components/Tabelas/TabelaNovoAtendimento';

import { Box } from '@mui/material';

export default function NovoAtendimento() {
  const linkList = [
    {
      label: 'Novo Atendimento',
      href: '#'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: '100vh',
        minWidth: '100%'
      }}
    >
      <NavBar />
      <Box sx={{ mt: 4, ml: 6 }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <NovoAtendimentoHeader />
      <Box
        sx={{
          maxWidth: 1100,
          display: 'flex',
          flexDirection: 'column',
          justifySelf: 'center',
          alignSelf: 'center',
          gap: 2
        }}
      >
        <TabelaNovoAtendimento />
      </Box>
    </Box>
  );
}
