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
      // Graças ao nosso 'next-auth.d.ts', o TypeScript conhece 'firstAccess'
      const firstAccess = session.user?.isUserUpdatePassword;
      console.log('SESSÃO COMPLETA NO CLIENTE:', session);

      // Se for o primeiro acesso, redireciona para a página de troca de senha
      if (firstAccess === 'true') {
        // Ajuste para 'True' ou 'False' conforme seu token
        router.replace('/NovoAcesso');
      }
    } else if (status === 'unauthenticated') {
      // Se por algum motivo ele chegar aqui sem estar logado, volta para o login
      router.replace('/');
    }
  }, [status, session, router]);

  // Enquanto a sessão está carregando, podemos mostrar um loader
  if (status === 'loading') {
    return <p>Carregando sua sessão...</p>;
  }

  return (
    <Box sx={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <BreadCrumb {...{ linkList }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '500', color: 'black', marginTop: '24px' }}
        >
          Inicio
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
