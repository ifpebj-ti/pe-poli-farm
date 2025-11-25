'use client';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import BreadCrumb from '@/src/components/BreadCrumb';
import TelaConsulta, { TelaConsultaHandle } from '@/src/components/Consulta';
import NavBar from '@/src/components/NavBar';
import PopupAtestado from '@/src/components/PopUp/PopupAtestado';

import { GetPatientByCPF } from '@/src/services/PatientService';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function ConsultaCompletaPage() {
  const router = useRouter();
  const { cpf } = useParams<{
    cpf: string;
  }>();
  const { data: session } = useSession();

  const [isAtestadoPopupOpen, setAtestadoPopupOpen] = useState(false);

  const consultaRef = useRef<TelaConsultaHandle>(null);

  const {
    data: paciente,
    error,
    isLoading
  } = useQuery({
    queryKey: ['patient', cpf],
    queryFn: () => GetPatientByCPF(cpf),
    enabled: !!cpf,
    staleTime: 5 * 60 * 1000 // 5 minutos
  });

  const linkList = [
    {
      label: 'Home',
      href: '/Inicio'
    },
    {
      label: 'Novo Atendimento',
      href: '/NovoAtendimento'
    },
    {
      label: paciente?.data
        ? `Consulta de ${paciente.data.name}`
        : 'Carregando...',
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
    // router.push(`/Procedimentos/${cpf}`); // Navega para a página TelaProcedimentos
  };

  const handleImprimirClick = () => {
    setAtestadoPopupOpen(true);
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

      <PopupAtestado
        open={isAtestadoPopupOpen}
        patientData={paciente!}
        doctorName={session?.user?.unique_name || ''}
        onClose={() => setAtestadoPopupOpen(false)}
      />

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
              disabled={isLoading || !paciente}
            >
              ATESTADO
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
            {error.message}
          </Typography>
        )}

        {/* Passa o paciente carregado para o formulário de consulta */}
        {!isLoading && !error && paciente && (
          <TelaConsulta ref={consultaRef} paciente={paciente.data} />
        )}
      </Box>
    </Box>
  );
}
