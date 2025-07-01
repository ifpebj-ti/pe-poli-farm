'use client';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog, DialogContent, Typography, Box, Button } from '@mui/material';

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

export default function PopupPacienteAdicionado({ open, onClose }: PopupProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '0px',
          width: 320,
          height: 360
        }
      }}
    >
      <DialogContent>
        <Box
          sx={{
            textAlign: 'center',
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ color: '#1351B4', fontSize: 80, mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{ mt: 1, fontWeight: 'bold', color: '#1351B4', fontSize: 16 }}
          >
            Paciente adicionado com sucesso!
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            As informações do paciente foram adicionadas!
          </Typography>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: '#1351B4',
              borderRadius: '20px',
              textTransform: 'none',
              px: 4,
              '&:hover': {
                backgroundColor: '#0f479e'
              }
            }}
          >
            Fechar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
