'use client';

import { useState } from 'react';

import PopupPacienteAdicionado from '@/src/components/PopUp/PopUpAddPaciente';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';

export default function FormDadosPaciente() {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 7, mb: 4 }}>
        <Box component="form" noValidate autoComplete="off">
          {/* ✅ TOPO AJUSTADO */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              mb: 4
            }}
          >
            {/* Esquerda - Breadcrumb e Título */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                  Novo Atendimento
                </Link>
                <Typography color="text.primary">Novo Paciente</Typography>
              </Breadcrumbs>
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', fontWeight: 500, mt: 5 }}
              >
                Dados Pessoais do Paciente
              </Typography>
            </Box>

            {/* Direita - Botões */}
            <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: 10 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 10 }}
                onClick={handleOpenPopup}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: 10 }}
              >
                Avançar
              </Button>
            </Box>
          </Box>

          {/* Dados Pessoais */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Nome Completo" fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Nome Social" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="CPF" fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="SUS" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="RG" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Data de nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Telefone" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Nome da mãe" fullWidth />
            </Grid>
          </Grid>

          {/* Endereço */}
          <Typography variant="h5" sx={{ mt: 5, mb: 3, color: 'black' }}>
            Endereço
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField label="CEP" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField label="Cidade" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="Bairro" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField label="Rua" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <TextField label="Nº" fullWidth />
            </Grid>
          </Grid>

          {/* Contato de Emergência */}
          <Typography variant="h5" sx={{ mt: 5, mb: 3, color: 'black' }}>
            Contato de Emergência
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField label="Nome" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField label="Parentesco" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="Telefone" fullWidth />
            </Grid>
          </Grid>

          {/* Botão inferior */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 10 }}
            >
              Novo Contato
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Popup de confirmação */}
      <PopupPacienteAdicionado open={openPopup} onClose={handleClosePopup} />
    </>
  );
}
