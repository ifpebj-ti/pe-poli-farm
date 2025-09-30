'use client';

import { useState } from 'react';

import PopupConfirmacaoPrescricao from '@/src/components/PopUp/PopupConfirmacaoPrescricao';

import { PatientExam } from '@/src/lib/pacientes';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onAdd: (exam: PatientExam) => void;
}

export default function PopupPrescricaoExame({
  open,
  onClose,
  onAdd
}: PopupProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [exam, setExam] = useState({
    name: '',
    description: '',
    priority: 'baixa',
    observations: ''
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExam((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdicionarClick = () => {
    onAdd(exam);
    onClose();
    setConfirmOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
            Adicionar Prescrição de Exames
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Nome do exame:"
                name="name"
                value={exam.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Finalidade do exame:"
                name="description"
                value={exam.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="prioridade-label">Prioridade:</InputLabel>
                <Select
                  labelId="prioridade-label"
                  label="Prioridade:"
                  name="priority"
                  value={exam.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="baixa">Baixa</MenuItem>
                  <MenuItem value="media">Média</MenuItem>
                  <MenuItem value="alta">Alta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Observações:"
                name="observations"
                value={exam.observations}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
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

      <PopupConfirmacaoPrescricao
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
