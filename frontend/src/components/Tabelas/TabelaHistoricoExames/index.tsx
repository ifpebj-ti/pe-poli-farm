'use client';

import { useEffect, useState } from 'react';

// 1. Importações necessárias
import PopupDetalhes from '@/src/components/PopUp/PopUpDetalhes';

import { api } from '@/src/services/api';
import {
  Box,
  Button,
  CircularProgress,
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

// Tipo para a estrutura da tabela (o que você quer no final)
type Exame = {
  id: number;
  nome: string;
  profissional: string;
  data: string;
  tipoExame: string;
};

// Tipo que representa a resposta crua da sua API
type PacienteApiResponse = {
  id: number;
  nome: string;
  profissional?: string; // Campo opcional
  data: string;
  tipoExame?: string; // Campo opcional
};

export default function TabelaHistoricoExames() {
  const [open, setOpen] = useState(false);

  // Estados para dados da API, loading e erro
  const [exames, setExames] = useState<Exame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [, setExameSelecionado] = useState<Exame | null>(null);

  // Hook para buscar os dados da API
  useEffect(() => {
    const fetchExames = async () => {
      try {
        setLoading(true);
        const response = await api.get('/Patient/GetAll');

        // ✅ CORREÇÃO: Tratamento para campos opcionais
        const dadosAdaptados: Exame[] = response.data.map(
          (paciente: PacienteApiResponse) => ({
            id: paciente.id,
            nome: paciente.nome,
            // Adiciona um valor padrão se o campo da API for nulo ou indefinido
            profissional: paciente.profissional || 'Não informado',
            data: paciente.data,
            // Adiciona um valor padrão se o campo da API for nulo ou indefinido
            tipoExame: paciente.tipoExame || 'Não especificado'
          })
        );

        setExames(dadosAdaptados);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar histórico de exames:', err);
        setError('Não foi possível carregar o histórico de exames.');
      } finally {
        setLoading(false);
      }
    };

    fetchExames();
  }, []);

  const handleOpen = (exame: Exame) => {
    setExameSelecionado(exame);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExameSelecionado(null);
  };

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
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        pt: 3,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                  PACIENTE
                </TableCell>
                <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                  PROFISSIONAL SOLICITANTE
                </TableCell>
                <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                  DATA
                </TableCell>
                <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                  TIPO DE EXAME
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ paddingY: 1, whiteSpace: 'nowrap' }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {exames.map((exame) => (
                <TableRow key={exame.id}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {exame.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {exame.profissional}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {exame.data
                      ? format(
                          new Date(exame.data.replace(/-/g, '/')),
                          'dd/MM/yyyy',
                          { locale: ptBR }
                        )
                      : 'Não informado'}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {exame.tipoExame}
                  </TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1, sm: 0 },
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: '#1351B4',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          minWidth: 120,
                          height: 30,
                          marginRight: { xs: 0, sm: '18px' },
                          '&:hover': { backgroundColor: '#0f479e' }
                        }}
                        onClick={() => handleOpen(exame)}
                      >
                        VER MAIS
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          /* Adicione a lógica de download aqui */
                        }}
                        sx={{
                          backgroundColor: '#0E930B',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          minWidth: 120,
                          height: 30,
                          '&:hover': { backgroundColor: '#086506' }
                        }}
                      >
                        BAIXAR PDF
                      </Button>
                    </Box>
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

      <PopupDetalhes open={open} handleClose={handleClose} />
    </Box>
  );
}
