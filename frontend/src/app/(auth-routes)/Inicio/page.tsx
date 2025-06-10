'use client';

import BreadCrumb from '@/src/components/BreadCrumb';
import AgendamentoCard from '@/src/components/Cards/Cardagendamento';
import CardEstatistica from '@/src/components/Cards/CardEstatistica';
import MenuInicio from '@/src/components/MenuInicio';
import NavBar from '@/src/components/NavBar';

import { Box, Container, Grid, Typography } from '@mui/material';

export default function Inicio() {
  const linkList = [
    {
      label: 'Página Inicial',
      href: '#'
    }
  ];

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <BreadCrumb {...{ linkList }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '500', color: 'black', marginTop: '24px' }}
        >
          Inicios
        </Typography>
        <MenuInicio />

        {/* Usando Grid v2. Note que a prop "item" foi removida dos filhos. */}
        <Grid container spacing={4} sx={{ mt: 2, pb: 10 }}>
          {/* Coluna da Esquerda (sem a prop "item") */}
          <Grid size={{ xs: 12, md: 8 }}>
            <CardEstatistica />
          </Grid>

          {/* Coluna da Direita (sem a prop "item") */}
          <Grid size={{ xs: 12, md: 4 }}>
            <AgendamentoCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
