import BreadCrumb from '@/src/components/BreadCrumb';
import NovoAtendimentoHeader from '@/src/components/Headers/HeaderNovoAtendimento';
import NavBar from '@/src/components/NavBar';
import TabelaNovoAtendimento from '@/src/components/Tabelas/TabelaNovoAtendimento';

import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

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
        <Button
          variant="outlined"
          sx={{
            width: 'fit-content',
            alignSelf: 'flex-end',
            height: 36,
            borderRadius: '18px',
            textTransform: 'none',
            mx: 4,
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
          <Add /> NOVO PACIENTE
        </Button>
      </Box>
    </Box>
  );
}
