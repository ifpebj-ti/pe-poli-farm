'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle
} from 'react';

import PopupAtestado from '@/src/components/PopUp/PopupAtestado';
import PopupPrescricaoExame from '@/src/components/PopUp/PopupPrescricaoExame';
import PopupPrescricaoMedicacao from '@/src/components/PopUp/PopupPrescricaoMedicacao';

import { Patient, PatientExam, PatientMedication } from '@/src/lib/pacientes';
import { api } from '@/src/services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  IconButton
} from '@mui/material';

interface TelaConsultaProps {
  paciente: Patient;
}

export type TelaConsultaHandle = {
  submit: () => void;
};

const initialState = {
  anamnese: {
    bloodPressure: '',
    glucose: '',
    temperature: '',
    weight: '',
    heartRate: '',
    respiratoryRate: '',
    bloodType: '',
    saturation: '',
    height: '',
    // --- CAMPOS QUE VAMOS MUDAR ---
    diabetes: false,
    antecPathological: false,
    necesPsicobio: false,
    allergies: false,
    useOfProthesis: false,
    medicationsInUse: false,
    // --- FIM DA MUDANÇA ---
    respiratoryPattern: '',
    pulmonaryAuscultation: '',
    skinColor: '',
    cardiacBubbles: '',
    pulse: '',
    rhythm: '',
    pupils: '',
    speech: '',
    consciousnessLevel: '',
    motorResponse: '',
    // Esses a gente mantém como texto, porque o usuário vai escrever neles
    allergiesType: '',
    antecPathologicalType: '',
    medicationInUseType: '',
    signsAndSymptoms: '',
    previousSurgeries: '',
    medicalHypothesis: '',
    classificationStatus: {
      value: 'EMERGENCY'
    }
  },
  healthHistory: {
    familyHAS: false,
    familyDM: false,
    familyIAM: false,
    familyAVC: false,
    familyAlzheimer: false,
    familyCA: false,
    ownHAS: false,
    ownDM: false,
    ownIAM: false,
    ownAVC: false,
    ownAlzheimer: false,
    ownCA: false
  },
  prescriptions: [] as PatientMedication[],
  patientExams: [] as PatientExam[]
};

const TelaConsulta = forwardRef<TelaConsultaHandle, TelaConsultaProps>(
  ({ paciente }, ref) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [formData, setFormData] = useState(initialState);
    const [openMedicacaoPopup, setOpenMedicacaoPopup] = useState(false);
    const [openExamePopup, setOpenExamePopup] = useState(false);
    const [openAtestadoPopup, setOpenAtestadoPopup] = useState(false);

    const inputStyles = {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: '#F5F5F5'
      },
      '& .MuiInputLabel-root': {
        color: '#6c757d'
      }
    };

    const buttonStyles = {
      borderRadius: '20px',
      fontWeight: 'bold',
      px: 3,
      minWidth: 130,
      textTransform: 'none',
      boxShadow: 'none'
    };

    useEffect(() => {
      const ultimoAtendimento = paciente.services?.[0];
      if (ultimoAtendimento?.medicalRecord?.anamnese) {
        const anamneseFromRecord = {
          ...ultimoAtendimento.medicalRecord.anamnese
        };
        // Ensure diabetes is a boolean
        if (typeof anamneseFromRecord.diabetes !== 'boolean') {
          anamneseFromRecord.diabetes = Boolean(anamneseFromRecord.diabetes);
        }
        setFormData((prev) => ({
          ...prev,
          anamnese: {
            ...prev.anamnese,
            ...anamneseFromRecord,
            classificationStatus:
              typeof anamneseFromRecord.classificationStatus === 'object' &&
              anamneseFromRecord.classificationStatus !== null
                ? anamneseFromRecord.classificationStatus
                : {
                    value: String(
                      anamneseFromRecord.classificationStatus || 'EMERGENCY'
                    )
                  },
            necesPsicobio:
              typeof anamneseFromRecord.necesPsicobio === 'boolean'
                ? anamneseFromRecord.necesPsicobio
                : false
          }
        }));
      }
    }, [paciente]);

    const handleAnamneseChange = (
      e:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const { name, value } = e.target;

      let finalValue: string | boolean = value;

      // Lista dos campos que devem ser booleanos
      const booleanFields = [
        'diabetes',
        'antecPathological',
        'necesPsicobio',
        'allergies',
        'useOfProthesis',
        'medicationsInUse'
      ];

      // Se o campo for um dos booleanos, converte 'true'/'false' (string) para boolean
      if (booleanFields.includes(name)) {
        finalValue = value === 'true';
      }

      setFormData((prev) => ({
        ...prev,
        anamnese: {
          ...prev.anamnese,
          [name]: finalValue
        }
      }));
    };

    const handleHealthHistoryChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        healthHistory: {
          ...prev.healthHistory,
          // Se for checkbox, usa o 'checked', senão, usa o 'value'
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    };

    const handleFinalizarConsulta = async () => {
      const professionalId = session?.user?.id;
      if (!professionalId) {
        alert('Erro: Profissional não autenticado.');
        return;
      }

      const payload = {
        patientId: paciente.id,
        professionalId: professionalId,
        anamnese: formData.anamnese,
        healthHistory: formData.healthHistory,
        prescriptions: formData.prescriptions.map((p) => ({
          medicationName: p.name, // Corrigindo o nome do campo
          posology: p.posology,
          type: p.type,
          prescriptionDate: new Date().toISOString(),
          executionDate: new Date().toISOString()
        })),
        patientExams: formData.patientExams
      };

      try {
        console.log('Enviando dados da consulta:', payload);
        await api.post('/MedicalRecord/MedicalConsultation', payload);
        alert('Consulta salva com sucesso!');
        router.push('/Pacientes');
      } catch (error) {
        console.error('Erro ao salvar a consulta:', error);
        alert(
          'Erro ao salvar a consulta. Verifique o console para mais detalhes.'
        );
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleFinalizarConsulta
    }));

    const handleAgendamentoClick = () => {
      router.push('/TelaAgendamento');
    };

    const handleRemovePrescription = (indexToRemove: number) => {
      setFormData((prev) => ({
        ...prev,
        prescriptions: prev.prescriptions.filter(
          (_, index) => index !== indexToRemove
        )
      }));
    };

    const handleRemoveExam = (indexToRemove: number) => {
      setFormData((prev) => ({
        ...prev,
        patientExams: prev.patientExams.filter(
          (_, index) => index !== indexToRemove
        )
      }));
    };

    const handleAddPrescription = (prescription: PatientMedication) => {
      setFormData((prev) => ({
        ...prev,
        prescriptions: [...prev.prescriptions, prescription]
      }));
    };

    // Função para adicionar um novo exame na lista
    const handleAddExam = (exam: PatientExam) => {
      setFormData((prev) => ({
        ...prev,
        patientExams: [...prev.patientExams, exam]
      }));
    };

    return (
      <>
        {/* BOTÕES DE CIMA */}
        <Box sx={{ p: 3, bgcolor: '#FFF', borderRadius: '16px' }}>
          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Dados do paciente
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 6, sm: 6 }}>
              <TextField
                label="Nome"
                fullWidth
                defaultValue={paciente.name}
                sx={inputStyles}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 3, sm: 3 }}>
              <TextField
                label="CPF"
                fullWidth
                defaultValue={paciente.cpf}
                sx={inputStyles}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 3, sm: 3 }}>
              <TextField
                label="SUS"
                fullWidth
                defaultValue={paciente.sus}
                sx={inputStyles}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Anamnese
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Pressão Art."
                name="bloodPressure"
                value={formData.anamnese.bloodPressure}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Glicose"
                name="glucose"
                value={formData.anamnese.glucose}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Temperatura"
                name="temperature"
                value={formData.anamnese.temperature}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Peso"
                name="weight"
                value={formData.anamnese.weight}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Freq. Card."
                name="heartRate"
                value={formData.anamnese.heartRate}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Freq. Resp."
                name="respiratoryRate"
                value={formData.anamnese.respiratoryRate}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Saturação"
                name="saturation"
                value={formData.anamnese.saturation}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Altura"
                name="height"
                value={formData.anamnese.height}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Tipo Sang."
                name="bloodType"
                value={formData.anamnese.bloodType}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Diabetes</InputLabel>
                <Select
                  name="diabetes"
                  value={String(formData.anamnese.diabetes)}
                  label="Diabetes"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Alergias</InputLabel>
                <Select
                  name="allergies"
                  value={String(formData.anamnese.allergies)}
                  label="Alergias"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Uso de Prótese</InputLabel>
                <Select
                  name="useOfProthesis"
                  value={String(formData.anamnese.useOfProthesis)}
                  label="Uso de Prótese"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Antec. Patológicos</InputLabel>
                <Select
                  name="antecPathological"
                  value={String(formData.anamnese.antecPathological)}
                  label="Antec. Patológicos"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Neces. Psicobio.</InputLabel>
                <Select
                  name="necesPsicobio"
                  value={String(formData.anamnese.necesPsicobio)}
                  label="Neces. Psicobio."
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Medicamentos em uso</InputLabel>
                <Select
                  name="medicationsInUse"
                  value={String(formData.anamnese.medicationsInUse)}
                  label="Medicamentos em uso"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* SEÇÕES NOVAS */}
          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Necessidades Psicobiológicas
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Padrão Respiratório</InputLabel>
                <Select
                  name="respiratoryPattern"
                  value={formData.anamnese.respiratoryPattern}
                  label="Padrão Respiratório"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="Dispneico">Dispneico</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Ausculta Pulmonar</InputLabel>
                <Select
                  name="pulmonaryAuscultation"
                  value={formData.anamnese.pulmonaryAuscultation}
                  label="Ausculta Pulmonar"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="mv+">mv+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Coloração da pele</InputLabel>
                <Select
                  name="skinColor"
                  value={formData.anamnese.skinColor}
                  label="Coloração da pele"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="Corada">Corada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Neuro
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Bulhas Cardíacas</InputLabel>
                <Select
                  name="cardiacBubbles"
                  value={formData.anamnese.cardiacBubbles}
                  label="Bulhas Cardíacas"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="Ruídos diastólicos">
                    Ruídos diastólicos
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Pulso</InputLabel>
                <Select
                  name="pulse"
                  value={formData.anamnese.pulse}
                  label="Pulso"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="Subclávio">Subclávio</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Ritmo</InputLabel>
                <Select
                  name="rhythm"
                  value={formData.anamnese.rhythm}
                  label="Ritmo"
                  onChange={handleAnamneseChange}
                >
                  <MenuItem value="Taquicardia Ventricular">
                    Taquicardia Ventricular
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Cardio
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={3}>
              <Typography sx={{ color: 'grey.700' }}>Pupilas:</Typography>
              <Select
                fullWidth
                defaultValue="Isocóricas Fotorreagentes"
                sx={{
                  ...inputStyles['& .MuiOutlinedInput-root'],
                  borderRadius: '10px'
                }}
              >
                <MenuItem value="Isocóricas Fotorreagentes">
                  Isocóricas Fotorreagentes (PPRR)
                </MenuItem>
                <MenuItem value="Anisocóricas">Anisocóricas</MenuItem>
                <MenuItem value="Midriáticas">Midriáticas</MenuItem>
                <MenuItem value="Mióticas">Mióticas</MenuItem>
                <MenuItem value="Arreagentes">Arreagentes</MenuItem>
                <MenuItem value="Fotorreagentes">Fotorreagentes</MenuItem>
                <MenuItem value="Sem Reação Fotomotora">
                  Sem Reação Fotomotora
                </MenuItem>
              </Select>
            </Grid>
            <Grid size={3}>
              <Typography sx={{ color: 'grey.700' }}>Fala:</Typography>
              <Select
                fullWidth
                defaultValue="Clara e Coerente"
                sx={{
                  ...inputStyles['& .MuiOutlinedInput-root'],
                  borderRadius: '10px'
                }}
              >
                <MenuItem value="Clara e Coerente">Clara e Coerente</MenuItem>
                <MenuItem value="Disartria">Disartria</MenuItem>
                <MenuItem value="Afasia Expressiva">Afasia Expressiva</MenuItem>
                <MenuItem value="Afasia Receptiva">Afasia Receptiva</MenuItem>
                <MenuItem value="Afonia">Afonia</MenuItem>
                <MenuItem value="Disfonia">Disfonia</MenuItem>
                <MenuItem value="Logorreia">Logorreia</MenuItem>
                <MenuItem value="Mutismo">Mutismo</MenuItem>
                <MenuItem value="Bradilalia">Bradilalia</MenuItem>
                <MenuItem value="Taquilalia">Taquilalia</MenuItem>
              </Select>
            </Grid>
            <Grid size={3}>
              <Typography sx={{ color: 'grey.700' }}>
                Nível de Consciência:
              </Typography>
              <Select
                fullWidth
                defaultValue="Alerta e Orientado"
                sx={{
                  ...inputStyles['& .MuiOutlinedInput-root'],
                  borderRadius: '10px'
                }}
              >
                <MenuItem value="Alerta e Orientado">
                  Alerta e Orientado (AO)
                </MenuItem>
                <MenuItem value="Confuso">Confuso</MenuItem>
                <MenuItem value="Sonolento">Sonolento</MenuItem>
                <MenuItem value="Obnubilado">Obnubilado</MenuItem>
                <MenuItem value="Torporoso">Torporoso</MenuItem>
                <MenuItem value="Comatoso">Comatoso</MenuItem>
                <MenuItem value="Letárgico">Letárgico</MenuItem>
              </Select>
            </Grid>
            <Grid size={3}>
              <Typography sx={{ color: 'grey.700' }}>
                Resposta Motora:
              </Typography>
              <Select
                fullWidth
                defaultValue="Normal"
                sx={{
                  ...inputStyles['& .MuiOutlinedInput-root'],
                  borderRadius: '10px'
                }}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Paresia">Paresia</MenuItem>
                <MenuItem value="Plegia">Plegia</MenuItem>
                <MenuItem value="Decorticação">Decorticação</MenuItem>
                <MenuItem value="Descerebração">Descerebração</MenuItem>
                <MenuItem value="Movimentos Involuntários">
                  Movimentos Involuntários
                </MenuItem>
                <MenuItem value="Sem Resposta">Sem Resposta</MenuItem>
              </Select>
            </Grid>
          </Grid>
          {/* Blocos de texto */}
          <Grid container spacing={2} mb={3}>
            {/* Antecedentes Familiares */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                color="black"
                sx={{ mr: 2, fontWeight: 500 }}
              >
                Antecedentes Familiares:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyHAS"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.familyHAS}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="HAS"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyDM"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.familyDM}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="DM"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyIAM"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.familyIAM}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="IAM"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyAVC"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.familyAVC}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="AVC"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyAlzheimer"
                    checked={formData.healthHistory.familyAlzheimer}
                    onChange={handleHealthHistoryChange}
                    sx={{ color: 'black' }}
                  />
                }
                label="Alzheimer"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="familyCA"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.familyCA}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="CA"
                slotProps={{ typography: { color: 'black' } }}
              />
            </Grid>

            {/* Antecedentes Pessoais */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Typography
                variant="body1"
                color="black"
                sx={{ mr: 2, fontWeight: 500 }}
              >
                Antecedentes Pessoais:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownHAS"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownHAS}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="HAS"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownDM"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownDM}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="DM"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownIAM"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownIAM}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="IAM"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownAVC"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownAVC}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="AVC"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownAlzheimer"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownAlzheimer}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="Alzheimer"
                slotProps={{ typography: { color: 'black' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ownCA"
                    sx={{ color: 'black' }}
                    checked={formData.healthHistory.ownCA}
                    onChange={handleHealthHistoryChange}
                  />
                }
                label="CA"
                slotProps={{ typography: { color: 'black' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Alergias"
                name="allergiesType"
                value={formData.anamnese.allergiesType}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Antec. Patológicos"
                name="antecPathologicalType"
                value={formData.anamnese.antecPathologicalType}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Medicamentos em uso"
                name="medicationInUseType"
                value={formData.anamnese.medicationInUseType}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Sinais e Sintomas"
                name="signsAndSymptoms"
                value={formData.anamnese.signsAndSymptoms}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Cirurgias Prévias"
                name="previousSurgeries"
                value={formData.anamnese.previousSurgeries}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Hipótese Médica"
                name="medicalHypothesis"
                value={formData.anamnese.medicalHypothesis}
                onChange={handleAnamneseChange}
                fullWidth
                sx={inputStyles}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" color="black" sx={{ mb: 1 }}>
                Prescrição de Medicação
              </Typography>
              <Button
                onClick={() => setOpenMedicacaoPopup(true)}
                variant="contained"
                sx={{
                  ...buttonStyles,
                  textTransform: 'uppercase',
                  backgroundColor: '#007BFF'
                }}
              >
                ADICIONAR
              </Button>
              <Box sx={{ mt: 2, maxHeight: 200, overflowY: 'auto' }}>
                {formData.prescriptions.map((prescription, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body1">
                      {/* >>> MUDE AQUI para a propriedade correta, ex: prescription.nome */}
                      {prescription.name || 'Medicamento sem nome'}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemovePrescription(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" color="black" sx={{ mb: 1 }}>
                Prescrição de Exames
              </Typography>
              <Button
                onClick={() => setOpenExamePopup(true)}
                variant="contained"
                sx={{
                  ...buttonStyles,
                  textTransform: 'uppercase',
                  backgroundColor: '#007BFF'
                }}
              >
                ADICIONAR
              </Button>
              <Box sx={{ mt: 2, maxHeight: 200, overflowY: 'auto' }}>
                {formData.patientExams.map((exam, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body1">
                      {/* >>> MUDE AQUI para a propriedade correta, ex: exam.nomeExame */}
                      {exam.name || 'Exame sem nome'}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemoveExam(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleAgendamentoClick}
              sx={{
                ...buttonStyles,
                backgroundColor: '#1351B4',
                '&:hover': { backgroundColor: '#0f479e' },
                textTransform: 'uppercase'
              }}
            >
              AGENDAMENTO
            </Button>
            <Button
              onClick={() => setOpenAtestadoPopup(true)}
              variant="contained"
              sx={{
                ...buttonStyles,
                backgroundColor: '#0E930B',
                '&:hover': { backgroundColor: '#086506' },
                textTransform: 'uppercase'
              }}
            >
              EMITIR ATESTADO
            </Button>
          </Box>
        </Box>
        <PopupPrescricaoMedicacao
          open={openMedicacaoPopup}
          onClose={() => setOpenMedicacaoPopup(false)}
          onAdd={handleAddPrescription}
        />
        <PopupPrescricaoExame
          open={openExamePopup}
          onClose={() => setOpenExamePopup(false)}
          onAdd={handleAddExam}
        />
        <PopupAtestado
          open={openAtestadoPopup}
          onClose={() => setOpenAtestadoPopup(false)}
          patientData={paciente}
        />
      </>
    );
  }
);

TelaConsulta.displayName = 'TelaConsulta';
export default TelaConsulta;
