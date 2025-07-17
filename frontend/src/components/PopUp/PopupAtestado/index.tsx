'use client';

import { useState } from 'react';

import PopupConfirmacaoPrescricao from '@/src/components/PopUp/PopupConfirmacaoPrescricao';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Box
} from '@mui/material';

interface PatientData {
  name: string;
  cpf: string;
  sus: string;
}

interface PopupAtestadoProps {
  open: boolean;
  onClose: () => void;
  patientData: PatientData;
}

export default function PopupAtestado({
  open,
  onClose,
  patientData
}: PopupAtestadoProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSaveClick = () => {
    onClose();
    setConfirmOpen(true);
  };

  const handlePrintClick = () => {
    // window.print() abre a caixa de diálogo de impressão do navegador
    window.print();
    console.log('Atestado impresso!');
  };

  // NOVO: Estilo base para todos os botões para evitar repetição
  const baseButtonStyles = {
    borderRadius: '20px', // Deixa os botões em formato de pílula
    textTransform: 'none', // Garante que o texto não fique em maiúsculas
    fontWeight: 'bold',
    px: 3, // Adiciona um padding horizontal
    color: 'white' // Define a cor do texto como branca para todos
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Emissão de Atestado
        </DialogTitle>
        <DialogContent>
          {/* Seção de Dados do Paciente */}
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              p: 2,
              mb: 3,
              mt: 1
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Typography variant="body1">
                  <strong>Nome:</strong> {patientData.name}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1">
                  <strong>CPF:</strong> {patientData.cpf}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1">
                  <strong>SUS:</strong> {patientData.sus}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Formulário do Atestado */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Motivo do afastamento:" fullWidth />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField label="CID (Código da Doença):" fullWidth />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Tempo de afastamento (dias):"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Data de início do afastamento:"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Data de retorno prevista:"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Profissional responsável:" fullWidth />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Observações adicionais:"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          {/* BOTÃO CANCELAR ATUALIZADO */}
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              ...baseButtonStyles, // Usa o estilo base
              backgroundColor: '#D32F2F', // Cor vermelha
              '&:hover': { backgroundColor: '#B71C1C' }
            }}
          >
            Cancelar
          </Button>
          {/* BOTÃO SALVAR ATUALIZADO */}
          <Button
            onClick={handleSaveClick}
            variant="contained"
            sx={{
              ...baseButtonStyles, // Usa o estilo base
              backgroundColor: '#388E3C', // Cor verde
              '&:hover': { backgroundColor: '#2E7D32' }
            }}
          >
            Salvar
          </Button>
          {/* BOTÃO IMPRIMIR ATUALIZADO */}
          <Button
            variant="contained"
            onClick={handlePrintClick}
            sx={{
              ...baseButtonStyles, // Usa o estilo base
              backgroundColor: '#1976D2', // Cor azul
              '&:hover': { backgroundColor: '#1565C0' }
            }}
          >
            Imprimir
          </Button>
        </DialogActions>
      </Dialog>

      <PopupConfirmacaoPrescricao
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
