'use client';

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
}

export default function PopupDetalhes({
  open,
  handleClose
}: PopupDetalhesExameProps) {
  const handlePrint = () => {
    // window.print() abre a caixa de diálogo de impressão do navegador
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
              <strong>Nome:</strong> Laura Oliveira
            </Typography>
            <Typography>
              <strong>CPF:</strong> 123.456.789-10
            </Typography>
            <Typography>
              <strong>SUS:</strong> 4874074
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
              <strong>Nome:</strong> Dra. Ana Souza
            </Typography>
            <Typography>
              <strong>Especialidade:</strong> Clínica Geral
            </Typography>
            <Typography>
              <strong>Data:</strong>{' '}
              {format(new Date('2025-05-01'), 'dd/MM/yyyy', {
                locale: ptBR
              })}
            </Typography>
          </Box>
        </Box>

        {/* Exames */}
        <Box>
          <Typography variant="h6" fontWeight={500} mb={1}>
            Exames
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Tipo de exame:</strong> Hemograma Completo
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Motivo da Solicitação:</strong> Verificação de sintomas
            gripais persistentes
          </Typography>

          <Typography sx={{ mb: 0.5 }}>
            <strong>Observações adicionais:</strong>
          </Typography>
          <Typography>
            Paciente apresenta febre e palidez. Solicita-se hemograma para
            verificar possíveis alterações hematológicas.
          </Typography>
        </Box>
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
