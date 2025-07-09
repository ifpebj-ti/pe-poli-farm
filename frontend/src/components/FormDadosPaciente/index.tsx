// Importando componentes do Material-UI
'use client';
import { DeleteOutline } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add'; // Ícone para o botão "Novo Contato"
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography
} from '@mui/material';

import { useFormDadosPaciente } from './hooks/useFormDadosPaciente';

// --- Componente da Página ---
const FormDadosPaciente = () => {
  const {
    patientData,
    handleChange,
    handleAddressChange,
    handleEmergencyContactChange,
    addEmergencyContact,
    removeEmergencyContact,
    handleSubmit
  } = useFormDadosPaciente();

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
              onClick={handleSubmit} // Conecta a função de envio
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
              onChange={handleChange}
              value={patientData.name}
              name="name"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nome Social"
              variant="outlined"
              fullWidth
              value={patientData.socialName}
              onChange={handleChange}
              name="socialName"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="CPF"
              variant="outlined"
              fullWidth
              required
              value={patientData.cpf}
              onChange={handleChange}
              name="cpf"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="SUS"
              variant="outlined"
              fullWidth
              value={patientData.sus}
              onChange={handleChange}
              name="sus"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="RG"
              variant="outlined"
              fullWidth
              value={patientData.rg}
              onChange={handleChange}
              name="rg"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Data de nascimento"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="date"
              value={patientData.birthDate}
              onChange={handleChange}
              name="birthDate"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              value={patientData.phone}
              onChange={handleChange}
              name="phone"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nome da mãe"
              variant="outlined"
              fullWidth
              value={patientData.motherName}
              onChange={handleChange}
              name="motherName"
            />
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
            <TextField
              label="CEP"
              variant="outlined"
              fullWidth
              value={patientData.address.cep}
              onChange={handleAddressChange}
              name="cep"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Cidade"
              variant="outlined"
              fullWidth
              value={patientData.address.city}
              onChange={handleAddressChange}
              name="city"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Bairro"
              variant="outlined"
              fullWidth
              value={patientData.address.neighborhood}
              onChange={handleAddressChange}
              name="neighborhood"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="Rua"
              variant="outlined"
              fullWidth
              value={patientData.address.street}
              onChange={handleAddressChange}
              name="street"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <TextField
              label="Nº"
              variant="outlined"
              fullWidth
              value={patientData.address.number}
              onChange={handleAddressChange}
              name="number"
            />
          </Grid>
        </Grid>

        {/* SEÇÃO: CONTATOS DE EMERGÊNCIA */}
        <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 3 }}>
          Contato de Emergência
        </Typography>
        {/* Loop sobre a lista de contatos no estado */}
        {patientData.emergencyContactDetails.map((contact, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            sx={{ mb: 2, alignItems: 'center' }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                name="name"
                label={`Nome (Contato ${index + 1})`}
                value={contact.name}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                name="relationship"
                label="Parentesco"
                value={contact.relationship}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                name="phone"
                label="Telefone"
                value={contact.phone}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <IconButton
                onClick={() => removeEmergencyContact(index)}
                disabled={patientData.emergencyContactDetails.length === 1}
              >
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        {/* BOTÃO para adicionar contatos */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 10 }}
            onClick={addEmergencyContact}
          >
            Novo Contato
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormDadosPaciente;
