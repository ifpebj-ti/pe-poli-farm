'use client';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from '@mui/material';

interface PopupConfirmacaoProps {
  open: boolean;
  onClose: () => void;
}

export default function PopupConfirmacaoPrescricao({
  open,
  onClose
}: PopupConfirmacaoProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4, // Adiciona um bom espaçamento interno
          gap: 2 // Espaço entre o ícone e o texto
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: '5rem', color: 'primary.main' }} // Ícone grande e azul
        />
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          Informações adicionadas com sucesso!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 5, // Botão um pouco mais largo
            minWidth: '120px'
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
