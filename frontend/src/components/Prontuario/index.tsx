'use client';

import { ReactNode, useEffect, useState } from 'react';

import { Patient } from '@/src/lib/pacientes';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';

interface DadosDoPacienteProps {
  paciente: Patient;
}

const DataItem = ({ label, value }: { label: string; value: ReactNode }) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Typography variant="body2" sx={{ color: '#333' }}>
      <Box component="span" sx={{ fontWeight: 'bold' }}>
        {label}:
      </Box>{' '}
      {value || 'Não informado'}
    </Typography>
  </Grid>
);

// Componente auxiliar para seções expansíveis (sem alterações)
type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};
const ExpandableSection = ({
  title,
  children,
  expanded,
  setExpanded
}: ExpandableSectionProps) => (
  <Paper
    sx={{ p: 2, mb: 3, borderRadius: '8px', boxShadow: 1, bgcolor: 'white' }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        pb: expanded ? 2 : 0,
        borderBottom: expanded ? '1px solid #eee' : 'none',
        mb: expanded ? 2 : 0
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', color: 'black', fontSize: '1.1rem' }}
      >
        {title}
      </Typography>
      {expanded ? (
        <KeyboardArrowUpIcon sx={{ color: '#666' }} />
      ) : (
        <KeyboardArrowDownIcon sx={{ color: '#666' }} />
      )}
    </Box>
    {expanded && <Box>{children}</Box>}
  </Paper>
);

export default function DadosDoPacientePageContent({
  paciente
}: DadosDoPacienteProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  // const [dataFiltro, setDataFiltro] = useState('01/04');
  const [anamneseExpanded, setAnamneseExpanded] = useState(true);
  const [necessidadesExpanded, setNecessidadesExpanded] = useState(true);
  const [neuroExpanded, setNeuroExpanded] = useState(true);
  const [cardioExpanded, setCardioExpanded] = useState(true);
  const [avaliacaoExpanded, setAvaliacaoExpanded] = useState(true);
  const [prescricaoExamesExpanded, setPrescricaoExamesExpanded] =
    useState(true);
  const [prescricaoMedicacaoExpanded, setPrescricaoMedicacaoExpanded] =
    useState(true);

  useEffect(() => {
    if (paciente?.services && paciente.services.length > 0) {
      setSelectedServiceId(paciente.services[0].id);
    }
  }, [paciente]);

  const selectedService = paciente?.services.find(
    (s) => s.id === selectedServiceId
  );
  const medicalRecord = selectedService?.medicalRecord;

  // Formata a data para uma leitura mais fácil
  const formatServiceDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'white', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            select
            size="small"
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            sx={{
              width: 120,
              bgcolor: 'white',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 38 },
              '& .MuiSelect-select': {
                paddingTop: '8px',
                paddingBottom: '8px',
                color: 'black'
              }
            }}
            SelectProps={{ IconComponent: ArrowDropDownIcon }}
          >
            {paciente?.services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {formatServiceDate(service.serviceDate)}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#1351B4',
              color: '#1351B4',
              textTransform: 'none',
              px: 3,
              py: 0.8,
              borderRadius: '8px',
              '&:hover': { borderColor: '#0e3a80', color: '#0e3a80' }
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1351B4',
              textTransform: 'none',
              px: 3,
              py: 0.8,
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: '#0e3a80' }
            }}
          >
            IMPRIMIR
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '8px',
          boxShadow: 1,
          bgcolor: 'white'
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
        >
          Dados do paciente
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <Typography
                component="span"
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                Nome:
              </Typography>{' '}
              {paciente.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <Typography
                component="span"
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                CPF:
              </Typography>{' '}
              {paciente.cpf}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <Typography
                component="span"
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                SUS:
              </Typography>{' '}
              {paciente.sus || 'Não informado'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <ExpandableSection
        title="Anamnese"
        expanded={anamneseExpanded}
        setExpanded={setAnamneseExpanded}
      >
        <Grid container spacing={2}>
          <DataItem
            label="Pressão Art."
            value={medicalRecord?.anamnese?.bloodPressure}
          />
          <DataItem label="Glicose" value={medicalRecord?.anamnese?.glucose} />
          <DataItem
            label="Temperatura"
            value={medicalRecord?.anamnese?.temperature}
          />
          <DataItem label="Peso" value={medicalRecord?.anamnese?.weight} />
          <DataItem
            label="Freq. Card."
            value={medicalRecord?.anamnese?.heartRate}
          />
          <DataItem
            label="Freq. Resp."
            value={medicalRecord?.anamnese?.respiratoryRate}
          />
          <DataItem
            label="Tipo Sang."
            value={medicalRecord?.anamnese?.bloodType}
          />
          <DataItem
            label="Saturação"
            value={medicalRecord?.anamnese?.saturation}
          />
          <DataItem label="Altura" value={medicalRecord?.anamnese?.height} />
          <DataItem
            label="Diabetes"
            value={medicalRecord?.anamnese?.diabetes ? 'Sim' : 'Não'}
          />
          <DataItem
            label="Alergias"
            value={medicalRecord?.anamnese?.allergies ? 'Sim' : 'Não'}
          />
          <DataItem
            label="Uso de prótese"
            value={medicalRecord?.anamnese?.useOfProthesis ? 'Sim' : 'Não'}
          />
        </Grid>
      </ExpandableSection>
      <ExpandableSection //arrumar isso
        title="Necessidades Psicobiológicas"
        expanded={necessidadesExpanded}
        setExpanded={setNecessidadesExpanded}
      >
        <Grid container spacing={2}>
          {[
            {
              label: 'Padrão Respiratório:',
              value: medicalRecord?.anamnese?.respiratoryRate || 'N/A'
            },
            { label: 'Gasometria:', value: 'ph' },
            { label: 'Escuta Pulmonar:', value: 'mv+' },
            { label: 'Pulso:', value: 'Arrítmico' },
            { label: 'Coloração da pele:', value: 'Corada' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'black' }}
                >
                  {item.label}
                </Typography>{' '}
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </ExpandableSection>
      <ExpandableSection //arrumar isso
        title="Neuro"
        expanded={neuroExpanded}
        setExpanded={setNeuroExpanded}
      >
        <Grid container spacing={2}>
          {[
            { label: 'Bulhas Cardíacas:', value: 'Ruídos diastólicos' },
            { label: 'Pulso:', value: 'Subclávio' },
            { label: 'Ritmo:', value: 'Taquicardia Ventricular' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'black' }}
                >
                  {item.label}
                </Typography>{' '}
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </ExpandableSection>
      <ExpandableSection //arrumar isso
        title="Cardio"
        expanded={cardioExpanded}
        setExpanded={setCardioExpanded}
      >
        <Grid container spacing={2}>
          {[
            { label: 'Pupilas:', value: 'Foto reagente' },
            { label: 'Fala:', value: 'Afonia' },
            { label: 'Nível de consciência:', value: 'Sonolento' },
            { label: 'Resp. motora:', value: 'Plegia' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'black' }}
                >
                  {item.label}
                </Typography>{' '}
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </ExpandableSection>
      <ExpandableSection //arrumar isso
        title="Avaliação e Exame Físico"
        expanded={avaliacaoExpanded}
        setExpanded={setAvaliacaoExpanded}
      >
        <Grid container spacing={2}>
          {[
            { label: 'Peso:', value: '62Kg' },
            { label: 'FC:', value: '75bpm' },
            { label: 'PA:', value: '17mmHg' },
            { label: 'PA:', value: '17mmHg' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'black' }}
                >
                  {item.label}
                </Typography>{' '}
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </ExpandableSection>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '8px',
          boxShadow: 1,
          bgcolor: 'white'
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 'bold', color: 'black', fontSize: '1.1rem' }}
        >
          Saúde e Doença
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Stack direction="column" spacing={2}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Antecedentes Familiares:
                </Typography>
                <Grid container spacing={1}>
                  {Object.entries({
                    HAS: medicalRecord?.healthAndDisease?.familyHAS,
                    DM: medicalRecord?.healthAndDisease?.familyDM,
                    IAM: medicalRecord?.healthAndDisease?.familyIAM,
                    AVC: medicalRecord?.healthAndDisease?.familyAVC,
                    Alzheimer: medicalRecord?.healthAndDisease?.familyAlzheimer,
                    CA: medicalRecord?.healthAndDisease?.familyCA
                  }).map(([key, value]) => (
                    <Grid key={key}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={value} disabled size="small" />
                        }
                        label={<Typography variant="body2">{key}</Typography>}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Antecedentes Pessoais:
                </Typography>
                <Grid container spacing={1}>
                  {Object.entries({
                    HAS: medicalRecord?.healthAndDisease?.ownHAS,
                    DM: medicalRecord?.healthAndDisease?.ownDM,
                    IAM: medicalRecord?.healthAndDisease?.ownIAM,
                    AVC: medicalRecord?.healthAndDisease?.ownAVC,
                    Alzheimer: medicalRecord?.healthAndDisease?.ownAlzheimer,
                    CA: medicalRecord?.healthAndDisease?.ownCA
                  }).map(([key, value]) => (
                    <Grid key={key}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={value} disabled size="small" />
                        }
                        label={<Typography variant="body2">{key}</Typography>}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Alergias
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Poeira, Dipirona
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Antec. Patológicos
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Diabetes
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Medicamentos em uso
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Ibuprofeno
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Cirurgias Prévias
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Rinoplastia
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Sinais e Sintomas
            </Typography>
            <Box
              sx={{
                p: 2, // Preenchimento interno
                border: '1px solid #e0e0e0', // Borda sutil
                borderRadius: 1, // Bordas arredondadas
                minHeight: '6em', // Altura mínima para parecer um campo de texto de várias linhas
                backgroundColor: '#fafafa', // Um fundo levemente acinzentado para indicar que não é editável
                whiteSpace: 'pre-wrap' // Essencial para respeitar quebras de linha no texto
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {/* Conecta com os dados dinâmicos e oferece um fallback */}
                {medicalRecord?.anamnese?.signsAndSymptoms ||
                  'Nenhuma informação de sinais e sintomas registrada.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: '8px',
              boxShadow: 1,
              bgcolor: 'white',
              height: '100%'
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
            >
              Diagnóstico Médico
            </Typography>
            <Box
              sx={{
                p: 2, // Preenchimento interno
                border: '1px solid #e0e0e0', // Borda sutil
                borderRadius: 1, // Bordas arredondadas
                minHeight: '6em', // Altura mínima para parecer um campo de texto de várias linhas
                backgroundColor: '#fafafa', // Um fundo levemente acinzentado para indicar que não é editável
                whiteSpace: 'pre-wrap' // Essencial para respeitar quebras de linha no texto
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {/* Conecta com os dados dinâmicos e oferece um fallback */}
                {medicalRecord?.anamnese?.medicalHypothesis ||
                  'Nenhuma informação de diagnóstico médico registrada.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* O 'item' é cada filho do grid. */}
        {/* xs={12}: Em telas extra pequenas (mobile), ocupa 100% da largura. */}
        {/* md={6}: Em telas médias ou maiores, ocupa 6 de 12 colunas (50%). */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ExpandableSection
            title="Prescrição de Exames"
            expanded={prescricaoExamesExpanded}
            setExpanded={setPrescricaoExamesExpanded}
          >
            <Box
              sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                minHeight: '6em',
                backgroundColor: '#fafafa',
                whiteSpace: 'pre-wrap'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {/* Dados dos exames aqui */}
                {/* Exemplo: medicalRecord?.anamnese?.exames || 'Nenhum exame prescrito.' */}
                Nenhum exame prescrito.
              </Typography>
            </Box>
          </ExpandableSection>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ExpandableSection
            title="Prescrição de Medicação"
            expanded={prescricaoMedicacaoExpanded}
            setExpanded={setPrescricaoMedicacaoExpanded}
          >
            <Box
              sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                minHeight: '6em',
                backgroundColor: '#fafafa',
                whiteSpace: 'pre-wrap'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {/* Aqui você pode mapear sobre medicalRecord?.patientMedications */}
                {medicalRecord?.patientMedications &&
                medicalRecord.patientMedications.length > 0
                  ? medicalRecord.patientMedications
                      .map((med) => `${med.name} - ${med.posology}`)
                      .join('\n')
                  : 'Nenhuma medicação prescrita.'}
              </Typography>
            </Box>
          </ExpandableSection>
        </Grid>
      </Grid>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '8px',
          boxShadow: 1,
          bgcolor: 'white'
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 'bold', color: 'black', fontSize: '1.1rem' }}
        >
          Anotações
        </Typography>
        <Box
          sx={{
            p: 2, // Preenchimento interno
            border: '1px solid #e0e0e0', // Borda sutil
            borderRadius: 1, // Bordas arredondadas
            minHeight: '6em', // Altura mínima para parecer um campo de texto de várias linhas
            backgroundColor: '#fafafa', // Um fundo levemente acinzentado para indicar que não é editável
            whiteSpace: 'pre-wrap' // Essencial para respeitar quebras de linha no texto
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {/* Conecta com os dados dinâmicos e oferece um fallback */}
            {medicalRecord?.anamnese?.medicalHypothesis ||
              'Nenhuma informação de anotações registrada.'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
