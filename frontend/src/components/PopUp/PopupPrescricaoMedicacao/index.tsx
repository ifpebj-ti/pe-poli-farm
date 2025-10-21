'use client';

import { useState } from 'react'; // NOVO

import PopupConfirmacaoPrescricao from '@/src/components/PopUp/PopupConfirmacaoPrescricao';

import { PatientMedication } from '@/src/lib/pacientes';
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
  onAdd: (prescription: PatientMedication) => void;
}

const initialPrescriptionState = {
  name: '',
  posology: '',
  type: '' // O backend espera um 'type', que pode ser a frequência ou outra coisa
  // Adicione outros campos conforme o seu modelo do backend
};

export default function PopupPrescricaoMedicacao({
  open,
  onClose,
  onAdd
}: PopupProps) {
  // NOVO: Estado para controlar a confirmação
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [prescription, setPrescription] = useState(initialPrescriptionState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  // NOVO: Função para lidar com o clique
  const handleAdicionarClick = () => {
    // 4. Chamar o onAdd com os dados do estado antes de fechar
    onAdd(prescription as PatientMedication);
    onClose();
    setConfirmOpen(true);
    setPrescription(initialPrescriptionState); // Limpa o formulário para a próxima vez
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
              <TextField
                label="Nome do Medicamento:"
                name="name"
                value={prescription.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Posologia:"
                name="posology"
                value={prescription.posology}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Frequência (ex: 8/8h):"
                name="type"
                value={prescription.type}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Duração de uso (dias):"
                name="duration"
                // value={prescription.duration}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Observações:"
                name="observations"
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
