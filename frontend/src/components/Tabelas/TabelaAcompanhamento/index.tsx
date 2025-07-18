'use client';

import { useState } from 'react';

import PopupDetalhesTratamento from '@/src/components/PopUp/PopUpDetalhesTratamento';

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

type Paciente = {
  nome: string;
  profissional: string;
  data: string;
  tratamento: string;
  status: string;
};

const pacientes: Paciente[] = Array.from({ length: 7 }, () => ({
  nome: `Nome Paciente`,
  profissional: 'Dra. João',
  data: '2025-05-03',
  tratamento: 'Hemograma Completo',
  status: 'Em Andamento'
}));

export default function TabelaAcompanhamento() {
  const [open, setOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<Paciente | null>(null);

  const handleOpen = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPacienteSelecionado(null);
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
                <TableCell sx={{ paddingY: 1 }}>INÍCIO</TableCell>
                <TableCell sx={{ paddingY: 1 }}>TRATAMENTO</TableCell>
                <TableCell sx={{ paddingY: 1 }}>STATUS</TableCell>
                <TableCell align="right" sx={{ paddingY: 1 }} />
              </TableRow>
            </TableHead>

            <TableBody>
              {pacientes.map((paciente, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {paciente.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.profissional}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {format(
                      new Date(paciente.data.replace(/-/g, '/')),
                      'dd/MM/yyyy',
                      {
                        locale: ptBR
                      }
                    )}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.tratamento}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.status}</TableCell>
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
                        '&:hover': {
                          backgroundColor: '#0f479e'
                        }
                      }}
                      onClick={() => handleOpen(paciente)}
                    >
                      VER MAIS
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

      {pacienteSelecionado && (
        <PopupDetalhesTratamento
          open={open}
          handleClose={handleClose}
          tratamento={{
            nome: pacienteSelecionado.nome,
            profissional: pacienteSelecionado.profissional,
            dataInicio: pacienteSelecionado.data,
            status: pacienteSelecionado.status
          }}
        />
      )}
    </Box>
  );
}
