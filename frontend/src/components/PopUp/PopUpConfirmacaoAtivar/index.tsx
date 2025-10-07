'use client';

import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';

interface PopUpConfirmacaoAtivarProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  profissionalNome?: string;
}

export default function PopUpConfirmacaoAtivar({
  open,
  onClose,
  onConfirm,
  profissionalNome
}: PopUpConfirmacaoAtivarProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Confirmar Ativação
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 70, color: '#2e7d32' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Deseja realmente ativar este profissional?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profissionalNome
            ? `O usuário ${profissionalNome} terá acesso ao sistema novamente.`
            : 'O usuário terá acesso ao sistema novamente.'}
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
          color="success"
          sx={{ textTransform: 'none', px: 4, borderRadius: 20 }}
        >
          Ativar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
