/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';

import PopupDetalhes from '@/src/components/PopUp/PopUpDetalhes';

import { useHistoricoExames } from '@/src/app/(auth-routes)/HistoricoExames/hooks/useHistoricoExames';
const PopupDetalhesAny = PopupDetalhes as any;
import { Patient, PatientExam } from '@/src/lib/pacientes'; // Importando os tipos corretos
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

interface PatientWithLastExam {
  patient: Patient;
  lastExam: PatientExam;
}

export default function TabelaHistoricoExames() {
  const { pacientes, isLoading, error } = useHistoricoExames();
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedExam, setSelectedExam] = useState<PatientExam | null>(null);

  const patientsWithExams = useMemo(() => {
    if (!pacientes) return [];

    return pacientes
      .map((patient) => {
        const latestServiceWithExams = patient.services
          ?.filter((s) => s.medicalRecord?.patientExam?.length > 0)
          .sort(
            (a, b) =>
              new Date(b.serviceDate).getTime() -
              new Date(a.serviceDate).getTime()
          )[0];

        if (latestServiceWithExams) {
          const lastExam =
            latestServiceWithExams.medicalRecord.patientExam[
              latestServiceWithExams.medicalRecord.patientExam.length - 1
            ];
          return { patient, lastExam };
        }
        return null;
      })
      .filter((p): p is PatientWithLastExam => p !== null);
  }, [pacientes]);

  const handleOpen = (data: PatientWithLastExam) => {
    setSelectedPatient(data.patient);
    setSelectedExam(data.lastExam);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
    setSelectedExam(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', pt: 8 }}>
        Ocorreu um erro ao buscar os pacientes.
      </Typography>
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
        {patientsWithExams.length === 0 ? (
          <Typography sx={{ textAlign: 'center', mt: 4, color: 'black' }}>
            Nenhum histórico de exame encontrado.
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} elevation={1}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                    <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                      NOME DO PACIENTE
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
                  {patientsWithExams.map((data) => (
                    <TableRow key={data.patient.id}>
                      <TableCell sx={{ paddingY: 1 }}>
                        <Typography
                          sx={{ color: '#1351B4', cursor: 'pointer' }}
                        >
                          {data.patient.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                        {data.lastExam.professionalName}
                      </TableCell>
                      <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                        {format(
                          new Date(data.lastExam.prescriptionDate),
                          'dd/MM/yyyy',
                          { locale: ptBR }
                        )}
                      </TableCell>
                      <TableCell sx={{ paddingY: 1, whiteSpace: 'nowrap' }}>
                        {data.lastExam.name}
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
                            onClick={() => handleOpen(data)}
                            sx={{
                              backgroundColor: '#1351B4',
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontWeight: 500,
                              minWidth: 120,
                              height: 30,
                              marginRight: { xs: 0, sm: '18px' }
                            }}
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
                              height: 30
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
          </>
        )}
      </Box>
      <PopupDetalhesAny
        open={open}
        handleClose={handleClose}
        patient={selectedPatient}
        exam={selectedExam}
      />
    </Box>
  );
}
