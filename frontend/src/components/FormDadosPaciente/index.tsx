'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import PopupPacienteAdicionado from '@/src/components/PopUp/PopUpAddPaciente';

import { PatientFormData } from '@/src/lib/pacientes';
import { api } from '@/src/services/api';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';

import {
  normalizeCPF,
  normalizeRG,
  normalizeTelephone
} from './schemas/TextMaskAdapter';

export default function FormDadosPaciente() {
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();

  const initialState: PatientFormData = {
    name: '',
    socialName: '',
    birthDate: '',
    sus: '',
    cpf: '',
    rg: '',
    phone: '',
    motherName: '',
    address: {
      cep: '',
      street: '',
      city: '',
      number: 0,
      neighborhood: ''
    },
    emergencyContactDetails: [{ name: '', phone: '', relationship: '' }] // Começa com um contato
  };
  const [formData, setFormData] = useState<PatientFormData>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleEmergencyContactChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContactDetails];
    updatedContacts[index] = { ...updatedContacts[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      emergencyContactDetails: updatedContacts
    }));
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContactDetails: [
        ...prev.emergencyContactDetails,
        { name: '', phone: '', relationship: '' }
      ]
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Previne o recarregamento da página

    // Converte o número do endereço para inteiro antes de enviar
    const payload = {
      ...formData,
      address: {
        ...formData.address,
        number: formData.address.number || 0
      }
    };

    try {
      console.log('Enviando dados do paciente:', payload);
      await api.post('/Patient', payload);
      setOpenPopup(true); // Abre o popup de sucesso
      return payload; // Retorna os dados do paciente
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      alert('Falha ao salvar paciente. Verifique os dados e tente novamente.');
      return null;
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
    handleAvancarClick(formData.cpf); // Navega para a página TelaConsulta com o CPF do paciente
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleCancelarClick = () => {
    router.push('/NovoAtendimento'); // Navega para a página NovoAtendimento
  };

  const handleAvancarClick = (patientCPF: string) => {
    router.push(`/TelaConsulta/${patientCPF}`); // Navega para a página TelaConsulta
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
                onClick={handleCancelarClick}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 10 }}
                onClick={handleOpenPopup}
                type="submit"
              >
                Salvar
              </Button>
              {/* <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: 10 }}
                onClick={() => {
                  handleAvancarClick(formData.cpf);
                  handleSubmit(SubmitEvent);
                }}
              >
                Avançar
              </Button> */}
            </Box>
          </Box>

          {/* Dados Pessoais */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nome Completo"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nome Social"
                name="socialName"
                fullWidth
                value={formData.socialName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                name="cpf"
                label="CPF"
                fullWidth
                required
                value={formData.cpf}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const { value } = event.target;
                  event.target.value = normalizeCPF(value);
                  handleChange(event);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="SUS"
                name="sus"
                fullWidth
                value={formData.sus}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="RG"
                name="rg"
                fullWidth
                value={formData.rg}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const { value } = event.target;
                  event.target.value = normalizeRG(value);
                  handleChange(event);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Data de nascimento"
                name="birthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.birthDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Telefone"
                name="phone"
                fullWidth
                value={formData.phone}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const { value } = event.target;
                  event.target.value = normalizeTelephone(value);
                  handleChange(event);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nome da mãe"
                name="motherName"
                fullWidth
                value={formData.motherName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Endereço */}
          <Typography variant="h5" sx={{ mt: 5, mb: 3, color: 'black' }}>
            Endereço
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="CEP"
                name="cep"
                fullWidth
                value={formData.address.cep}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Cidade"
                name="city"
                fullWidth
                value={formData.address.city}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Bairro"
                name="neighborhood"
                fullWidth
                value={formData.address.neighborhood}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Rua"
                name="street"
                fullWidth
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <TextField
                label="Nº"
                fullWidth
                name="number"
                value={formData.address.number}
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>

          {/* Contato de Emergência */}
          <Typography variant="h5" sx={{ mt: 5, mb: 3, color: 'black' }}>
            Contato de Emergência
          </Typography>
          {formData.emergencyContactDetails.map((contact, index) => (
            <Grid container spacing={3} key={index} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  label="Nome"
                  name="name"
                  fullWidth
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select // <-- A propriedade 'select' transforma o campo em um dropdown
                  name="relationship"
                  label="Parentesco"
                  value={contact.relationship}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  fullWidth
                >
                  {/* Cada opção é um MenuItem. O 'value' é o que vai para a API. */}
                  {/* O texto dentro do MenuItem é o que o usuário vê. */}
                  <MenuItem value="FATHER">Pai</MenuItem>
                  <MenuItem value="MOTHER">Mãe</MenuItem>
                  <MenuItem value="SON">Filho(a)</MenuItem>
                  <MenuItem value="SIBLING">Irmão(ã)</MenuItem>
                  <MenuItem value="SPOUSE">Cônjuge</MenuItem>
                  <MenuItem value="OUTHER">Outro</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="Telefone"
                  name="phone"
                  fullWidth
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                />
              </Grid>
            </Grid>
          ))}

          {/* Botão inferior */}
          <Box sx={{ mt: 4, pb: 4 }}>
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

      {/* Popup de confirmação */}
      <PopupPacienteAdicionado open={openPopup} onClose={handleClosePopup} />
    </>
  );
}
