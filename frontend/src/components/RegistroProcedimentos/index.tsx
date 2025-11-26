'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'; // Importe useRouter
import { useState } from 'react';

import PopupProcedimento from '@/src/components/PopUp/PopUpRegistroProcedimentos'; // ⬅️ Importa aqui

import { usePacienteCpf } from '@/src/app/(auth-routes)/TelaProntuario/[cpf]/hooks/usePacienteCpf';
import { api } from '@/src/services/api';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function TelaRegistro() {
  const router = useRouter();
  const params = useParams();
  const cpf = params.cpf as string;
  // Extrai o CPF dos parâmetros da rota
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { paciente, isLoading, error } = usePacienteCpf(cpf);
  const [openPopup, setOpenPopup] = useState(false);
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    procedureType: 'Curativo Simples', // Valores iniciais podem vir das props ou ser fixos
    medicationsInUse: 'Ibuprofeno',
    conductDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistrar = () => {
    const professionalId = session?.user?.id;

    if (!paciente?.id || !professionalId) {
      alert('Erro: Não foi possível identificar o paciente ou o profissional.');
      return;
    }

    // Monta o payload (pacote de dados) para enviar à API
    const payload = {
      patientId: paciente.id,
      professionalId: professionalId,
      medicalRecordId: paciente.services || 'ID_DO_PRONTUARIO_AQUI',
      procedureType: formData.procedureType,
      medicationsInUse: formData.medicationsInUse,
      conductDescription: formData.conductDescription
    };

    try {
      console.log('Enviando payload:', payload);
      // Envia os dados para o endpoint da API
      api.post('/MedicalRecord/CreateProcedure', payload);
      // Se deu tudo certo, abre o popup de sucesso
      setOpenPopup(true);
    } catch (error) {
      console.error('Erro ao registrar procedimento:', error);
      alert('Oxente! Deu um erro ao registrar o procedimento. Tenta de novo.');
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    router.push('/Pacientes');
  };

  const handleVoltarClick = () => {
    router.push('/Pacientes');
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
            onClick={handleVoltarClick}
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
              value={paciente?.name || ''}
              InputProps={{ readOnly: true }}
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
              value={paciente?.cpf}
              InputProps={{ readOnly: true }}
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
              value={paciente?.sus}
              InputProps={{ readOnly: true }}
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
              value={formData.procedureType}
              name="procedureType"
              onChange={handleChange}
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
              value={
                session?.user?.unique_name || 'Profissional não identificado'
              }
              InputProps={{ readOnly: true }}
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
              value={formData.medicationsInUse}
              name="medicationsInUse"
              onChange={handleChange}
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
            value={formData.conductDescription}
            name="conductDescription"
            onChange={handleChange}
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
