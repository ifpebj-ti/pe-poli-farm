/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

import { CertificateTemplate } from './CertificateTemplate';

interface PopupAtestadoProps {
  open: boolean;
  patientName: string;
  patientCpf: string;
  doctorName: string;
  onClose: () => void;
}

const PopupAtestado: React.FC<PopupAtestadoProps> = ({
  open,
  patientName,
  patientCpf,
  doctorName,
  onClose
}) => {
  const [componentToPrint, setComponentToPrint] = useState(null);
  const componentRef = (el: any) => {
    setComponentToPrint(el);
  };

  const handlePrint = useReactToPrint({
    content: () => componentToPrint
  } as any);

  const [view, setView] = useState<'form' | 'certificate'>('form');
  const [certificateData, setCertificateData] = useState<any>(null);

  const [reason, setReason] = React.useState('');
  const [days, setDays] = React.useState('');
  const [cid, setCid] = React.useState('');
  const [crm, setCrm] = React.useState('');

  const handleGenerateCertificate = () => {
    setCertificateData({
      patientName,
      patientCpf,
      doctorName,
      date: new Date().toLocaleDateString('pt-BR'),
      reason,
      days,
      cid,
      crm
    });
    setView('certificate');
  };

  const handleClose = () => {
    setView('form');
    // Clear form fields
    setReason('');
    setDays('');
    setCid('');
    setCrm('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Emitir Atestado</DialogTitle>
      <DialogContent dividers>
        {view === 'form' ? (
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
          </Box>
        ) : (
          <CertificateTemplate ref={componentRef} {...certificateData} />
        )}
      </DialogContent>
      <DialogActions>
        {view === 'form' ? (
          <>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleGenerateCertificate} variant="contained">
              Gerar Atestado
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setView('form')}>Voltar</Button>
            <Button onClick={handlePrint} variant="contained">
              Imprimir
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PopupAtestado;
