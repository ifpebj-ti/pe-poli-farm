'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import TelaConsulta, { TelaConsultaHandle } from '@/src/components/Consulta';
import NavBar from '@/src/components/NavBar';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { usePacienteCpf } from '../../TelaProntuario/[cpf]/hooks/usePacienteCpf';

type ConsultaPageProps = {
  params: {
    cpf: string;
  };
};

export default function ConsultaCompletaPage({ params }: ConsultaPageProps) {
  const router = useRouter();
  const { cpf } = params;

  const consultaRef = useRef<TelaConsultaHandle>(null);

  // Usa o hook para buscar os dados iniciais do paciente
  const { paciente, isLoading, error } = usePacienteCpf(cpf);

  const linkList = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Novo Atendimento',
      href: '/NovoAtendimento'
    },
    {
      label: paciente ? `Consulta de ${paciente.name}` : 'Carregando...',
      href: '#'
    }
  ];

  // Estilos para os botões do topo, replicados aqui
  const buttonStyles = {
    borderRadius: '20px',
    fontWeight: 500,
    px: 3,
    minWidth: 130
  };
  const handleCancelarClick = () => {
    router.push('/NovoAtendimento'); // Navega para a página NovoAtendimento
  };

  const handleProcedimentosClick = () => {
    handleSalvarClick(); // Salva os dados antes de navegar
    router.push('/Procedimentos'); // Navega para a página TelaProcedimentos
  };

  const handleImprimirClick = () => {
    // Lógica para imprimir, talvez usando window.print() ou gerando um PDF
    window.print(); // Exemplo simples de impressão
    console.log('Botão IMPRIMIR clicado');
  };

  const handleSalvarClick = () => {
    // Verifica se a referência está conectada e chama a função 'submit' exposta
    if (consultaRef.current) {
      consultaRef.current.submit();
    }
  };

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />

      {/* Conteúdo abaixo da NavBar: BreadCrumb e Nova Atendimento/Botões */}
      <Box sx={{ mt: 4, ml: 10, mr: 4 }}>
        {' '}
        {/* Adicionado mr para o alinhamento da direita */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          {/* Lado esquerdo: BreadCrumb */}
          <BreadCrumb {...{ linkList }} />

          {/* Lado direito: "Novo Atendimento" e Botões */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleImprimirClick}
              sx={{
                ...buttonStyles,
                backgroundColor: '#1351B4',
                '&:hover': { backgroundColor: '#0f479e' },
                textTransform: 'uppercase'
              }}
            >
              IMPRIMIR
            </Button>
            <Button
              variant="contained"
              onClick={handleCancelarClick}
              color="error"
              sx={{ ...buttonStyles, textTransform: 'none' }}
            >
              CANCELAR
            </Button>
            <Button
              variant="contained"
              sx={{
                ...buttonStyles,
                backgroundColor: '#0E930B',
                '&:hover': { backgroundColor: '#086506' },
                textTransform: 'none'
              }}
              onClick={handleProcedimentosClick}
            >
              PROCEDIMENTOS
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Box principal para o conteúdo da consulta, que agora começará com "Dados do paciente" */}
      <Box sx={{ p: 4, pt: 0, bgcolor: '#fff' }}>
        {isLoading && (
          <Box sx={{ textAlign: 'center', p: 10 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" sx={{ textAlign: 'center', p: 10 }}>
            {error}
          </Typography>
        )}

        {/* Passa o paciente carregado para o formulário de consulta */}
        {!isLoading && !error && paciente && (
          <TelaConsulta ref={consultaRef} paciente={paciente} />
        )}
      </Box>
    </Box>
  );
}
