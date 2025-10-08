'use client';

import { useState } from 'react';

import PopupDetalhes from '@/src/components/PopUp/PopUpDetalhes';

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

const exames = [
  {
    nome: 'Netinho',
    profissional: 'Dr. João Silva',
    data: '2025-07-17',
    tipoExame: 'Hemograma'
  },
  {
    nome: 'Teste',
    profissional: 'Dr. João Silva',
    data: '2025-07-17',
    tipoExame: 'Raio-X'
  },
  {
    nome: 'Carlos Andrade',
    profissional: 'Dr. João Silva',
    data: '2025-07-17',
    tipoExame: 'Eco Cardiograma'
  }
];

export default function TabelaHistoricoExames() {
  const [open, setOpen] = useState(false);
  const [, setExameSelecionado] = useState<unknown>(null);

  const handleOpen = (exame: unknown) => {
    setExameSelecionado(exame);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExameSelecionado(null);
  };

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
              {exames.map((exame, index) => (
                <TableRow key={index}>
                  {/* Nome do Paciente */}
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {exame.nome}
                    </Typography>
                  </TableCell>
                  {/* Profissional Solicitante */}
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {exame.profissional}
                  </TableCell>
                  {/* Data */}
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {format(
                      new Date(exame.data.replace(/-/g, '/')),
                      'dd/MM/yyyy',
                      { locale: ptBR }
                    )}
                  </TableCell>
                  {/* Tipo de Exame */}
                  <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                    {exame.tipoExame}
                  </TableCell>
                  {/* Célula de Ações */}
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Box
                      // Empilha os botões verticalmente em telas pequenas
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1, sm: 0 }, // Espaçamento vertical em mobile
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
                          marginRight: { xs: 0, sm: '18px' }, // Remove margem direita em mobile
                          '&:hover': { backgroundColor: '#0f479e' }
                        }}
                        onClick={() => handleOpen(exame)}
                      >
                        VER MAIS
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleOpen(exame)}
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

      {/* Pop-up de Detalhes funcionando corretamente */}
      <PopupDetalhes open={open} handleClose={handleClose} />
    </Box>
  );
}
