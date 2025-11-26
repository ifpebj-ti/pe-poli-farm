'use client';

import { Patient, PatientExam } from '@/src/lib/pacientes';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PopupDetalhesExameProps {
  open: boolean;
  handleClose: () => void;
  patient: Patient | null;
  exam: PatientExam | null;
}

export default function PopupDetalhes({
  open,
  handleClose,
  patient,
  exam
}: PopupDetalhesExameProps) {
  const handlePrint = () => {
    window.print();
    console.log('Conteúdo do Pop-up de Detalhes impresso!');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight={600}>
          Detalhes do Exame
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {patient && exam ? (
          <>
            {/* Paciente */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={500} mb={1}>
                Paciente
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 5,
                  flexWrap: 'wrap'
                }}
              >
                <Typography>
                  <strong>Nome:</strong> {patient.name}
                </Typography>
                <Typography>
                  <strong>CPF:</strong> {patient.cpf}
                </Typography>
                <Typography>
                  <strong>SUS:</strong> {patient.sus || 'Não informado'}
                </Typography>
              </Box>
            </Box>

            {/* Profissional */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={500} mb={1}>
                Profissional Solicitante
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 5,
                  flexWrap: 'wrap'
                }}
              >
                <Typography>
                  <strong>Nome:</strong>{' '}
                  {exam.professionalName || 'Não informado'}
                </Typography>
                {/* Especialidade não está no PatientExam, pode ser adicionada se necessário */}
                <Typography>
                  <strong>Data:</strong>{' '}
                  {exam.prescriptionDate
                    ? format(new Date(exam.prescriptionDate), 'dd/MM/yyyy', {
                        locale: ptBR
                      })
                    : 'Não informada'}
                </Typography>
              </Box>
            </Box>

            {/* Exames */}
            <Box>
              <Typography variant="h6" fontWeight={500} mb={1}>
                Exames
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Tipo de exame:</strong> {exam.name}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Motivo da Solicitação:</strong> {exam.description}
              </Typography>

              {/* Observações adicionais - se existir um campo para isso no PatientExam */}
              {/* <Typography sx={{ mb: 0.5 }}>
                <strong>Observações adicionais:</strong>
              </Typography>
              <Typography>
                {exam.observations || 'Nenhuma observação adicional.'}
              </Typography> */}
            </Box>
          </>
        ) : (
          <Typography>Dados do paciente ou exame não disponíveis.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            paddingX: 4,
            fontWeight: 600
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{
            textTransform: 'none',
            borderRadius: '40px',
            paddingX: 4,
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#1351B4'
          }}
        >
          Imprimir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
