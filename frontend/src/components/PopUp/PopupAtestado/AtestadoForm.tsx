import React from 'react';

import { Box, Button, TextField } from '@mui/material';

interface AtestadoFormProps {
  patientName: string;
  patientCpf: string;
  doctorName: string;
  onSubmit: (data: {
    reason: string;
    days: string;
    cid: string;
    crm: string;
  }) => void;
  onCancel: () => void;
}

export const AtestadoForm: React.FC<AtestadoFormProps> = ({
  patientName,
  patientCpf,
  doctorName,
  onSubmit,
  onCancel
}) => {
  const [reason, setReason] = React.useState('');
  const [days, setDays] = React.useState('');
  const [cid, setCid] = React.useState('');
  const [crm, setCrm] = React.useState('');

  const handleSubmit = () => {
    onSubmit({ reason, days, cid, crm });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Paciente"
        fullWidth
        value={patientName}
        disabled
        margin="normal"
      />
      <TextField
        label="CPF"
        fullWidth
        value={patientCpf}
        disabled
        margin="normal"
      />
      <TextField
        label="Médico"
        fullWidth
        value={doctorName}
        disabled
        margin="normal"
      />
      <TextField
        label="Motivo do atestado"
        multiline
        rows={4}
        fullWidth
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Dias de afastamento"
        fullWidth
        value={days}
        onChange={(e) => setDays(e.target.value)}
        margin="normal"
      />
      <TextField
        label="CID"
        fullWidth
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        margin="normal"
      />
      <TextField
        label="CRM"
        fullWidth
        value={crm}
        onChange={(e) => setCrm(e.target.value)}
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Gerar Atestado
        </Button>
      </Box>
    </Box>
  );
};
