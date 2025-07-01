'use client';

import { useState } from 'react';

import PopupConfirmacao from '@/src/components/PopUp/PopUpConfirmação';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PopupEditarTratamentoProps {
  open: boolean;
  handleClose: () => void;
  tratamento: {
    nome: string;
    profissional: string;
    dataInicio: string;
    status: string;
    observacoes?: string;
    evolucao?: string;
  } | null;
}

export default function PopupEditarTratamento({
  open,
  handleClose,
  tratamento
}: PopupEditarTratamentoProps) {
  const [status, setStatus] = useState(tratamento?.status || '');
  const [observacoes, setObservacoes] = useState(
    tratamento?.observacoes ||
      'Tratamento iniciado após diagnóstico de infecção bacteriana. Retorno agendado para reavaliação em 08/05/2025.'
  );
  const [evolucao, setEvolucao] = useState(
    tratamento?.evolucao ||
      '03/05/2025 – Melhora de sintomas\n05/05/2025 – Queixa de dor abdominal leve'
  );

  const [openConfirmacao, setOpenConfirmacao] = useState(false);

  const handleSalvar = () => {
    console.log('Status:', status);
    console.log('Observações:', observacoes);
    console.log('Evolução:', evolucao);

    handleClose(); // Fecha o popup de edição
    setOpenConfirmacao(true); // Abre o popup de confirmação
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        BackdropProps={{
          sx: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component="span" fontWeight={600}>
            Detalhes do Tratamento
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {tratamento && (
            <Box>
              {/* Dados do Paciente */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={500} mb={1}>
                  Paciente
                </Typography>
                <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <Typography>
                    <strong>Nome:</strong> {tratamento.nome}
                  </Typography>
                  <Typography>
                    <strong>CPF:</strong> 123.456.789-10
                  </Typography>
                  <Typography>
                    <strong>SUS:</strong> 46743674
                  </Typography>
                </Box>
              </Box>

              {/* Profissional Responsável */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={500} mb={1}>
                  Profissional Responsável
                </Typography>
                <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <Typography>
                    <strong>Nome:</strong> {tratamento.profissional}
                  </Typography>
                  <Typography>
                    <strong>Especialidade:</strong> Clínica Geral
                  </Typography>
                </Box>
              </Box>

              {/* Informações do Tratamento */}
              <Box>
                <Typography variant="h6" fontWeight={500} mb={1}>
                  Informações do Tratamento
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  <strong>Início:</strong>{' '}
                  {format(
                    new Date(tratamento.dataInicio.replace(/-/g, '/')),
                    'dd/MM/yyyy',
                    { locale: ptBR }
                  )}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>Status do Tratamento:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>Observações:</strong>
                  </Typography>
                  <TextField
                    multiline
                    minRows={3}
                    fullWidth
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </Box>

                <Box>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>Evolução:</strong>
                  </Typography>
                  <TextField
                    multiline
                    minRows={3}
                    fullWidth
                    value={evolucao}
                    onChange={(e) => setEvolucao(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              paddingX: 4,
              fontWeight: 600
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSalvar}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              paddingX: 4,
              fontWeight: 600
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <PopupConfirmacao
        open={openConfirmacao}
        handleClose={() => setOpenConfirmacao(false)}
      />
    </>
  );
}
