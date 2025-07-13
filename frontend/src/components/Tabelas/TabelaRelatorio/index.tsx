'use client';
import { useRouter } from 'next/navigation'; // Importe useRouter

import {
  Box,
  Button,
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

const relatorios = Array.from({ length: 7 }, () => ({
  nome: `Nome Paciente`,
  profissional: 'Dr. João',
  data: '2025-05-03',
  tipoAtendimento: 'Consulta Médica'
}));

export default function TabelaRelatorio() {
  const router = useRouter();
  const handleGerarRelatorioClick = () => {
    // Navega para a página RelatorioPaciente SEM passar um ID específico
    router.push('/RelatorioPaciente');
  };

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
              {relatorios.map((relatorio, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {relatorio.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {relatorio.profissional}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {format(
                      new Date(relatorio.data.replace(/-/g, '/')),
                      'dd/MM/yyyy',
                      {
                        locale: ptBR
                      }
                    )}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {relatorio.tipoAtendimento}
                  </TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleGerarRelatorioClick}
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

        {/* Paginação agora dentro da largura da tabela */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={5} page={1} color="primary" />
        </Box>
      </Box>
    </Box>
  );
}
