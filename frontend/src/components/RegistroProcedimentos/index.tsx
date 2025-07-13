'use client';

import { useState } from 'react';

import PopupProcedimento from '@/src/components/PopUp/PopUpRegistroProcedimentos'; // ⬅️ Importa aqui

import { Box, Typography, TextField, Button } from '@mui/material';

export default function TelaRegistro() {
  const [openPopup, setOpenPopup] = useState(false);

  const handleRegistrar = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          px: 4,
          pt: 3,
          pb: 6,
          fontFamily: 'Roboto, sans-serif'
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#666' }}>
            Atendimento médico
          </Typography>
          <Button
            variant="outlined"
            sx={{
              height: 36,
              borderRadius: '18px',
              textTransform: 'none',
              borderColor: '#1351B4',
              color: '#1351B4',
              fontWeight: 400,
              px: 3,
              '&:hover': {
                borderColor: '#0f479e',
                backgroundColor: '#f0f7ff'
              }
            }}
          >
            Voltar
          </Button>
        </Box>

        {/* Dados do paciente */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 540, mb: 2, color: '#000', fontSize: '30px' }}
        >
          Dados do paciente
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              Nome:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="Laura Oliveira"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              CPF:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="123.456.789-10"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              SUS:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="46743674"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
        </Box>

        {/* Procedimento */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              Tipo de Procedimento:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="Curativo Simples"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              Profissional Responsável:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="Médico Cardiologista"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
            >
              Medicamentos em uso:
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="Ibuprofeno"
              sx={{ '& input': { color: '#666' } }}
            />
          </Box>
        </Box>

        {/* Conduta */}
        <Box mb={4}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, mb: 0.5, color: '#000' }}
          >
            Observações:
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Digite aqui"
            fullWidth
            sx={{ '& input': { color: '#666' } }}
          />
        </Box>

        {/* Botão Registrar */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1351B4',
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            fontFamily: 'Roboto, sans-serif',
            '&:hover': {
              backgroundColor: '#0f479e'
            }
          }}
          onClick={handleRegistrar}
        >
          REGISTRAR PROCEDIMENTOS
        </Button>
      </Box>

      {/* Popup */}
      <PopupProcedimento open={openPopup} onClose={handleClose} />
    </>
  );
}
