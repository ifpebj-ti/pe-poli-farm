'use client';

import React from 'react';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';

interface PopUpConfirmacaoDesativarProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  profissionalNome?: string;
}

export default function PopUpConfirmacaoDesativar({
  open,
  onClose,
  onConfirm,
  profissionalNome
}: PopUpConfirmacaoDesativarProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Confirmar Desativação
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 70, color: '#d32f2f' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Deseja realmente desativar este profissional?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profissionalNome
            ? `O usuário ${profissionalNome} ficará inativo no sistema.`
            : 'O usuário ficará inativo no sistema.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: 'none', px: 4, borderRadius: 20 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ textTransform: 'none', px: 4, borderRadius: 20 }}
        >
          Desativar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
