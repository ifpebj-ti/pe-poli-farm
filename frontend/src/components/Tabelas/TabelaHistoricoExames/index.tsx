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

// Dados simulados
const exames = Array.from({ length: 7 }, () => ({
  nome: `Nome Paciente`,
  profissional: 'Dra. Ana Souza',
  data: '2025-05-01',
  tipoExame: 'Hemograma Completo'
}));

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
    <Box sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                <TableCell sx={{ paddingY: 1 }}>PACIENTE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>
                  PROFISSIONAL SOLICITANTE
                </TableCell>
                <TableCell sx={{ paddingY: 1 }}>DATA</TableCell>
                <TableCell sx={{ paddingY: 1 }}>TIPO DE EXAME</TableCell>
                <TableCell align="right" sx={{ paddingY: 1 }} />
              </TableRow>
            </TableHead>

            <TableBody>
              {exames.map((exame, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {exame.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {exame.profissional}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {format(
                      new Date(exame.data.replace(/-/g, '/')),
                      'dd/MM/yyyy',
                      { locale: ptBR }
                    )}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{exame.tipoExame}</TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
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
                        marginRight: '18px',
                        '&:hover': { backgroundColor: '#0f479e' }
                      }}
                      onClick={() => handleOpen(exame)}
                    >
                      VER MAIS
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
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

      {/* 🔥 Pop-up de Detalhes funcionando corretamente */}
      <PopupDetalhes open={open} handleClose={handleClose} />
    </Box>
  );
}
