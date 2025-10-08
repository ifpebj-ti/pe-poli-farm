'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import NovoAtendimentoHeader from '@/src/components/Headers/HeaderNovoAtendimento';
import NavBar from '@/src/components/NavBar';
import TabelaNovoAtendimento from '@/src/components/Tabelas/TabelaNovoAtendimento';

import { Patient } from '@/src/lib/pacientes';
import { api } from '@/src/services/api';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useDebounce } from '../Pacientes/hooks/useDebounce';
import { usePacientes } from './hooks/usePacienteNovoAtendimento';

export default function NovoAtendimento() {
  const router = useRouter();

  const linkList = [
    {
      label: 'Novo Atendimento',
      href: '#'
    }
  ];

  // --- Estados da UI ---
  const [termoBusca, setTermoBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('NO_SERVICE'); // Começa com o primeiro filtro
  const [page, setPage] = useState(1);
  const debouncedBusca = useDebounce(termoBusca, 500);

  // --- Lógica de Dados ---
  const { pacientes, isLoading, error, totalPages } = usePacientes(
    debouncedBusca,
    statusFiltro,
    page
  );

  // Efeito para resetar a página ao mudar filtros
  useEffect(() => {
    setPage(1);
  }, [debouncedBusca, statusFiltro]);

  // --- Handlers ---
  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTermoBusca(e.target.value);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => setPage(newPage);
  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setStatusFiltro(newStatus);
    }
  };

  const handleIniciarAtendimento = async (paciente: Patient) => {
    // CENÁRIO 1: Paciente já está em atendimento
    console.log('Paciente recebido no clique:', paciente);

    if (statusFiltro === 'IN_SERVICE') {
      console.log(
        `Paciente ${paciente.name} já em atendimento. Navegando para a consulta...`
      );
      // Supondo que a página de consulta também use o CPF na rota
      router.push(`/TelaConsulta/${paciente.cpf}`);
      return; // Interrompe a execução
    }
    try {
      console.log(`Iniciando novo atendimento para ${paciente.id}...`);
      // -> ALTERAÇÃO: Chamada POST para o novo endpoint
      await api.post(
        '/api/Service/initService',
        paciente.id, // 1. O corpo da requisição (apenas a string do ID)
        {
          // 2. O objeto de configuração, onde forçamos o cabeçalho
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Se a API funcionou, o paciente agora está "IN_SERVICE".
      alert(`Atendimento para ${paciente.name} iniciado com sucesso!`);

      // O ideal é navegar para a tela de consulta após iniciar o serviço
      router.push(`/TelaConsulta/${paciente.cpf}`);
    } catch (apiError) {
      console.error('Erro ao iniciar atendimento:', apiError);
      alert('Não foi possível iniciar o atendimento. Tente novamente.');
    }
  };

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
      <Box
        component="main" // Define o papel semântico do container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Faz este container ocupar todo o espaço vertical disponível // Adiciona um padding unificado (em cima, dos lados e embaixo)
          p: { xs: 2, md: 4 } // Padding horizontal um pouco maior para telas grandes
        }}
      >
        {/* BreadCrumb vem primeiro */}
        <Box sx={{ mb: 2, mx: 4 }}>
          {' '}
          {/* Apenas uma pequena margem inferior para separar do Header */}
          <BreadCrumb {...{ linkList }} />
        </Box>

        {/* Header de Atendimento */}
        <NovoAtendimentoHeader
          termoBusca={termoBusca}
          onBuscaChange={handleBuscaChange}
          statusFiltro={statusFiltro}
          onStatusChange={handleStatusChange}
        />

        {/* Área da Tabela */}
        <Box sx={{ mt: 3 }}>
          {' '}
          {/* Margem superior para separar o header da tabela */}
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 8
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Buscando pacientes...</Typography>
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: 'center', pt: 8 }}>
              {error}
            </Typography>
          ) : (
            <TabelaNovoAtendimento
              pacientes={pacientes}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onIniciarAtendimento={handleIniciarAtendimento}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
