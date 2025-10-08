'use client';

import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';

interface PopUpConfirmacaoProps {
  open: boolean;
  onClose: () => void;
  mensagem?: string;
  descricao?: string;
}

export default function PopUpConfirmacao({
  open,
  onClose,
  mensagem = 'Usuário alterado com sucesso!',
  descricao = 'As informações do usuário foram atualizadas.'
}: PopUpConfirmacaoProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#1976d2' }} />
        </Box>
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          {mensagem}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {descricao}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            textTransform: 'none',
            px: 4,
            borderRadius: 20
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
