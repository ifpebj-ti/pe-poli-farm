'use client';

import { useState } from 'react'; // NOVO

import PopupConfirmacaoPrescricao from '@/src/components/PopUp/PopupConfirmacaoPrescricao';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@mui/material';

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

export default function PopupPrescricaoMedicacao({
  open,
  onClose
}: PopupProps) {
  // NOVO: Estado para controlar a confirmação
  const [confirmOpen, setConfirmOpen] = useState(false);

  // NOVO: Função para lidar com o clique
  const handleAdicionarClick = () => {
    onClose(); // Fecha o formulário
    setConfirmOpen(true); // Abre a confirmação
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
            Adicionar Prescrição de Medicação
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Nome do Medicamento:" fullWidth />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField label="Posologia:" fullWidth />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField label="Frequência (ex: 8/8h):" fullWidth />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Duração de uso (dias):" fullWidth />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Observações:" multiline rows={4} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              minWidth: '120px'
            }}
          >
            Voltar
          </Button>
          {/* ALTERADO: onClick chama a nova função */}
          <Button
            onClick={handleAdicionarClick}
            variant="contained"
            autoFocus
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              minWidth: '120px'
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* NOVO: Renderiza o pop-up de confirmação */}
      <PopupConfirmacaoPrescricao
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
