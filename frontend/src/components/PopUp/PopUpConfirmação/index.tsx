'use client';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';

interface PopupConfirmacaoProps {
  open: boolean;
  handleClose: () => void;
}

export default function PopupConfirmacao({
  open,
  handleClose
}: PopupConfirmacaoProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)' // Fundo bem suave
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <CheckCircleOutlineIcon
          sx={{ color: '#1351B4', fontSize: 80, mb: 1 }}
        />
      </DialogTitle>

      <DialogContent>
        <Box textAlign="center">
          <Typography
            variant="h6"
            component="span"
            sx={{ color: '#1351B4', fontWeight: 600 }}
          >
            Acompanhamento atualizado com sucesso!
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Seu acompanhamento foi atualizado!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            borderRadius: '20px',
            paddingX: 4,
            textTransform: 'none',
            backgroundColor: '#1351B4',
            '&:hover': {
              backgroundColor: '#0f479e'
            }
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
