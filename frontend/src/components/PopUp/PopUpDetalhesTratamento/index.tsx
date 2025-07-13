'use client';

import { useState } from 'react';

import PopupEditarTratamento from '@/src/components/PopUp/PopUpEditarTratameto';

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

interface PopupDetalhesTratamentoProps {
  open: boolean;
  handleClose: () => void;
  tratamento: {
    nome: string;
    profissional: string;
    dataInicio: string;
    status: string;
  } | null;
}

export default function PopupDetalhesTratamento({
  open,
  handleClose,
  tratamento
}: PopupDetalhesTratamentoProps) {
  const [openEditar, setOpenEditar] = useState(false);

  const handlePrint = () => {
    // window.print() abre a caixa de diálogo de impressão do navegador
    window.print();
    console.log('Conteúdo do Pop-up de Detalhes do Tratamento impresso!');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                    <strong>SUS:</strong> 4874074
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

                <Typography sx={{ mb: 1 }}>
                  <strong>Status do Tratamento:</strong> {tratamento.status}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  <strong>Observações:</strong>
                </Typography>
                <Typography>
                  - Tratamento iniciado devido diagnóstico de infecção
                  bacteriana.
                  <br />
                  - Retorno agendado para revisão em 01/07/2025.
                  <br />
                  <br />
                  <strong>Exames realizados:</strong>
                  <br />
                  01/06/2025 – Hemograma
                  <br />
                  05/06/2025 – Exame de urina
                  <br />
                  10/06/2025 – Coleta de dor abdominal leve
                </Typography>
              </Box>
            </Box>
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
            color="success"
            onClick={() => setOpenEditar(true)}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              paddingX: 4,
              fontWeight: 600
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              paddingX: 4,
              fontWeight: 600
            }}
          >
            Imprimir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Popup de Edição */}
      <PopupEditarTratamento
        open={openEditar}
        handleClose={() => setOpenEditar(false)}
        tratamento={tratamento}
      />
    </>
  );
}
