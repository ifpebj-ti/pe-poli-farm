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

type Paciente = {
  paciente: string;
  profissional: string;
  data: string;
  tratamento: string;
  status: string;
};

const pacientes = [
  {
    paciente: 'Netinho',
    profissional: 'Dr. João Silva',
    data: '17/07/2025',
    tratamento: 'Consulta de Rotina',
    status: 'Finalizado'
  },
  {
    paciente: 'Beatriz Lima',
    profissional: 'Dr. João Silva',
    data: '17/07/2025',
    tratamento: 'Sessão de Fisioterapia',
    status: 'Em Andamento'
  },
  {
    paciente: 'Fernando Martins',
    profissional: 'Dr. João Silva',
    data: '18/07/2025',
    tratamento: 'Exame de Sangue',
    status: 'Agendado'
  }
];

export default function TabelaAcompanhamento({
  status,
  inputData
}: {
  status: string;
  inputData: string;
}) {
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
              {pacientes
                .filter((paciente) => {
                  if (!status) return true;

                  console.log(paciente.status, status);

                  return paciente.status === status;
                })
                .filter((paciente) => {
                  if (!inputData) return true;

                  const normalizado = inputData.trim().toLowerCase();

                  return paciente.paciente.toLowerCase().includes(normalizado);
                })
                .map((paciente, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ paddingY: 1 }}>
                      <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                        {paciente.paciente}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {paciente.profissional}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>{paciente.data}</TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {paciente.tratamento}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {paciente.status}
                    </TableCell>
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
            nome: pacienteSelecionado.paciente,
            profissional: pacienteSelecionado.profissional,
            dataInicio: '17/07/2025',
            status: pacienteSelecionado.status
          }}
        />
      )}
    </Box>
  );
}
