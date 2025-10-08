'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import BreadCrumb from '@/src/components/BreadCrumb';
import PacientesHeader from '@/src/components/Headers/Headerpacientes';
import NavBar from '@/src/components/NavBar';
import TabelaPacientes from '@/src/components/Tabelas/TabelaPacientes';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { useDebounce } from './hooks/useDebounce';
import { usePacientes } from './hooks/usePaciente';

const PAGE_SIZE = 10;

export default function Pacientes() {
  const router = useRouter();
  const linkList = [
    {
      label: 'Pacientes',
      href: '#'
    }
  ];

  // --- ESTADOS DA UI ---
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [page, setPage] = useState(1);

  const debouncedBusca = useDebounce(termoBusca, 500);

  // --- LÓGICA DE DADOS ---
  const { pacientes: todosPacientes, isLoading, error } = usePacientes();

  const pacientesFiltrados = useMemo(() => {
    if (!debouncedBusca) return todosPacientes; // Se não há busca, retorna todos
    return todosPacientes.filter((p) =>
      p.name.toLowerCase().includes(debouncedBusca.toLowerCase())
    );
  }, [todosPacientes, debouncedBusca]);

  const totalPages = useMemo(() => {
    return Math.ceil(pacientesFiltrados.length / PAGE_SIZE);
  }, [pacientesFiltrados]);

  const pacientesDaPagina = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return pacientesFiltrados.slice(startIndex, startIndex + PAGE_SIZE);
  }, [pacientesFiltrados, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedBusca]);

  // --- HANDLERS ---
  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleVerProntuario = (pacienteCPF: string) => {
    console.log(
      `Navegando para o prontuário do paciente com ID: ${pacienteCPF}`
    );
    router.push(`/TelaProntuario/${pacienteCPF}`);
  };

  const responsivePadding = { xs: 2, sm: 4, md: 6 }; // Define um objeto de padding responsivo

  return (
    <Box
      sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}
    >
      <NavBar />
      {/* 1. BreadCrumb: Ajusta a margem lateral para ser responsiva */}
      <Box sx={{ mt: 4, ml: responsivePadding, px: { xs: 2, md: 0 } }}>
        <BreadCrumb {...{ linkList }} />
      </Box>
      <PacientesHeader
        termoBusca={termoBusca}
        onBuscaChange={handleBuscaChange}
      />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Buscando pacientes...</Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      {!isLoading && !error && (
        <TabelaPacientes
          pacientes={pacientesDaPagina}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onVerProntuario={handleVerProntuario}
        />
      )}
      {/* 2. Botão Novo Paciente: Ajusta o padding lateral */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          my: 2,
          // O padding lateral agora é responsivo
          px: responsivePadding
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => router.push('/NovoPaciente')}
          sx={{
            borderColor: '#1351B4',
            color: '#1351B4',
            borderRadius: '50px',
            textTransform: 'none',
            fontWeight: 'bold',
            paddingX: 3,
            paddingY: 0.8,
            // 3. Ocupa largura total em mobile e volta à largura original em md
            width: { xs: '100%', md: 'auto' },
            '&:hover': {
              backgroundColor: 'rgba(19, 81, 180, 0.04)',
              borderColor: '#1351B4'
            }
          }}
        >
          Novo Paciente
        </Button>
      </Box>
    </Box>
  );
}
