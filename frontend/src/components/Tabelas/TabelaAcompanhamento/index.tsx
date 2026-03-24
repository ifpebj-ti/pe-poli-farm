'use client';

import { useState } from 'react';

import PopupDetalhesTratamento from '@/src/components/PopUp/PopUpDetalhesTratamento';

import {
  AppointmentData,
  AppointmentStatusEnum,
  appointmentStatusLabels
} from '@/src/lib/appointment';
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

export default function TabelaAcompanhamento({
  status,
  inputData,
  appointments
}: {
  status: string;
  inputData: string;
  appointments: AppointmentData[];
}) {
  const [open, setOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<Paciente | null>(null);

  //  const handleOpen = (paciente: Paciente) => {
  //    setPacienteSelecionado(paciente);
  //    setOpen(true);
  //  };

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
              {appointments
                .filter((appointment) => {
                  if (!status) return true;

                  return appointment.status === status;
                })
                .filter((appointment) => {
                  if (!inputData) return true;

                  const normalizado = inputData.trim().toLowerCase();

                  return appointment.patientName
                    .toLowerCase()
                    .includes(normalizado);
                })
                .map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ paddingY: 1 }}>
                      <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                        {appointment.patientName}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {appointment.professionalName}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {appointment.scheduledAt.toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {appointment.specialty}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {
                        appointmentStatusLabels[
                          appointment.status as AppointmentStatusEnum
                        ]
                      }
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
                        //onClick={() => handleOpen(appointment)}
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
