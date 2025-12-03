'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import AgendamentoCard from '@/src/components/Cards/Cardagendamento';
import CardEstatistica from '@/src/components/Cards/CardEstatistica';
import MenuInicio from '@/src/components/MenuInicio';
import NavBar from '@/src/components/NavBar';

import { Box, Container, Grid, Typography } from '@mui/material';

const linkList = [
  {
    label: 'Página Inicial',
    href: '#'
  }
];

export default function Inicio() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Este efeito será executado quando a sessão for carregada
    if (status === 'authenticated') {
      const firstAccess = session.user?.isUserUpdatePassword;
      console.log('SESSÃO COMPLETA NO CLIENTE:', session);

      if (firstAccess === 'true') {
        router.replace('/NovoAcesso');
      }
    } else if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Carregando sua sessão...</p>;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        minHeight: '100vh', // 🔹 altura mínima em vez de fixa
        width: '100%',
        overflowX: 'hidden' // 🔹 evita scroll horizontal
      }}
    >
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
          pb: 4
        }}
      >
        <BreadCrumb {...{ linkList }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '500', color: 'black', mt: 3 }}
        >
          Início
        </Typography>

        <MenuInicio />

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <CardEstatistica />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AgendamentoCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
