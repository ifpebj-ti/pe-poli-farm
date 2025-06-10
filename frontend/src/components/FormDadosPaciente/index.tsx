import React from 'react';

// Importando componentes do Material-UI
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Ícone para o botão "Novo Contato"

// --- Componente da Página ---
const FormDadosPaciente = () => {
  return (
    // O Container centraliza o conteúdo e define uma largura máxima.
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box component="form" noValidate autoComplete="off">
        {/* CABEÇALHO E BOTÕES DE AÇÃO SUPERIORES */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                Novo Atendimento
              </Link>
              <Typography color="text.primary">Novo Paciente</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1" gutterBottom color="black">
              Dados Pessoais do Paciente
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="error" sx={{ borderRadius: 10 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 10 }}
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

        {/* SEÇÃO: DADOS PESSOAIS - Usando a nova sintaxe do Grid */}
        {/* Note que o "container" continua sendo necessário no Grid pai */}
        <Grid container spacing={3}>
          {/* A propriedade "item" foi removida e usamos "size={{...}}" */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Nome Social" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="CPF" variant="outlined" fullWidth required />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="SUS" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="RG" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Data de nascimento"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="date"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Telefone" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Nome da mãe" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        {/* SEÇÃO: ENDEREÇO */}
        <Typography
          variant="h5"
          component="h2"
          sx={{ mt: 5, mb: 3, color: 'black' }}
        >
          Endereço
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField label="CEP" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Cidade" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Bairro" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField label="Rua" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <TextField label="Nº" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        {/* SEÇÃO: CONTATO DE EMERGÊNCIA */}
        <Typography
          variant="h5"
          component="h2"
          sx={{ mt: 5, mb: 3, color: 'black' }}
        >
          Contato de Emergência
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField label="Nome" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Parentesco" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField label="Telefone" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        {/* BOTÃO INFERIOR */}
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
  );
};

export default FormDadosPaciente;
