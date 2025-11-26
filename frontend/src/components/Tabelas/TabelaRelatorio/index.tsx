'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 1. Importe a instância da API e o CircularProgress
import { api } from '@/src/services/api'; // <-- Verifique se este caminho está correto
import {
  Box,
  Button,
  CircularProgress, // Para o feedback de carregamento
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// 2. Defina o tipo de dado que corresponde à sua API
type Paciente = {
  id: number; // Essencial para a key e para a navegação
  nome: string;
  profissional: string;
  data: string;
  tipoAtendimento: string; // Verifique se este campo existe na sua API
};
const relatorios = [
  {
    nome: `Netinho`,
    profissional: 'Dr. João Silva',
    data: '2025-07-17',
    tipoAtendimento: 'Consulta Médica'
  },
  {
    nome: `Teste`,
    profissional: 'Dr. João Silva',
    data: '2025-07-17',
    tipoAtendimento: 'Consulta Médica'
  },
  {
    nome: `Carlos Andrade`,
    profissional: 'Dr. João Silva',
    data: '2025-07-18',
    tipoAtendimento: 'Consulta Médica'
  }
];

export default function TabelaRelatorio() {
  const router = useRouter();

  // 3. Crie os estados para os dados, carregamento e erros
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. Busque os dados da API quando o componente for montado
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/Patient/GetAll');
        setPacientes(response.data);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        setError('Não foi possível carregar os relatórios.');
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []); // O array vazio [] garante que a busca ocorra apenas uma vez

  // 5. Modifique a função para aceitar o ID do paciente
  const handleGerarRelatorioClick = (pacienteId: number) => {
    // Navega para uma página de relatório específica do paciente
    router.push(`/RelatorioPaciente/${pacienteId}`);
  };

  // 6. Adicione renderização condicional para carregamento e erro
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                <TableCell sx={{ paddingY: 1 }}>PACIENTE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>PROFISSIONAL</TableCell>
                <TableCell sx={{ paddingY: 1 }}>DATA</TableCell>
                <TableCell sx={{ paddingY: 1 }}>TIPO DE ATENDIMENTO</TableCell>
                <TableCell align="right" sx={{ paddingY: 1 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 7. Mapeie os dados do estado 'pacientes' */}
              {pacientes.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {paciente.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.profissional}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.data
                      ? format(
                          new Date(paciente.data.replace(/-/g, '/')),
                          'dd/MM/yyyy',
                          { locale: ptBR }
                        )
                      : 'Não informado'}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.tipoAtendimento}
                  </TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      // 8. Passe o ID do paciente para a função de clique
                      onClick={() => handleGerarRelatorioClick(paciente.id)}
                      sx={{
                        backgroundColor: '#1351B4',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: 120,
                        height: 30,
                        marginRight: '18px',
                        '&:hover': {
                          backgroundColor: '#0f479e'
                        }
                      }}
                    >
                      GERAR RELATÓRIO
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={5} page={1} color="primary" />
        </Box>
      </Box>
    </Box>
  );
}
