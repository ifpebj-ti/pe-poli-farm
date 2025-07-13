'use client';

import { useRouter } from 'next/navigation'; // Importe useRouter
import { useState } from 'react';

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
  TextField,
  Typography
} from '@mui/material';

export default function DadosDoPacientePageContent() {
  const [dataFiltro, setDataFiltro] = useState('01/04');
  const [anamneseExpanded, setAnamneseExpanded] = useState(true);
  const [necessidadesExpanded, setNecessidadesExpanded] = useState(true);
  const [neuroExpanded, setNeuroExpanded] = useState(true);
  const [cardioExpanded, setCardioExpanded] = useState(true);
  const [avaliacaoExpanded, setAvaliacaoExpanded] = useState(true);
  const [prescricaoExamesExpanded, setPrescricaoExamesExpanded] =
    useState(true);
  const [prescricaoMedicacaoExpanded, setPrescricaoMedicacaoExpanded] =
    useState(true);

  // State for checkboxes
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState({
    HAS: false,
    DM: false,
    IAM: false,
    AVC: false,
    Alzheimer: false,
    CA: false,
    Outros: false
  });
  const [antecedentesPessoais, setAntecedentesPessoais] = useState({
    HAS: false,
    DM: false,
    IAM: false,
    AVC: false,
    Alzheimer: false,
    CA: false,
    Outros: false
  });
  const [examesPrescritos, setExamesPrescritos] = useState({
    Exame01: true,
    Exame02: false,
    Exame03: false
  });
  const [medicacoesPrescritas, setMedicacoesPrescritas] = useState({
    Medicacao01: true,
    Medicacao02: false,
    Medicacao03: false
  });

  const router = useRouter();

  // Helper component for expandable sections
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

  const handleVoltarClick = () => {
    router.push('/Pacientes'); // Navega para a página /Pacientes
  };

  const handleImprimirClick = () => {
    // A função window.print() abre a caixa de diálogo de impressão do navegador
    window.print();
    console.log('Botão IMPRIMIR clicado!');
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
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
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
            <MenuItem value="01/04">01/04</MenuItem>
            <MenuItem value="01/05">01/05</MenuItem>
            <MenuItem value="01/06">01/06</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            onClick={handleVoltarClick}
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
            onClick={handleImprimirClick}
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
              Laura Oliveira
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
              123.456.789-10
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
              46743674
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
          {[
            { label: 'Pressão Art.:', value: '14/7' },
            { label: 'Glicose:', value: '130mg/dl' },
            { label: 'Temperatura:', value: '37º' },
            { label: 'Peso:', value: '64Kg' },
            { label: 'Freq. Card.:', value: '70 bpm' },
            { label: 'Freq. Resp.:', value: '45 ipm' },
            { label: 'Tipo Sang.:', value: 'O-' },
            { label: 'Saturação:', value: '99 SpO2' },
            { label: 'Altura:', value: '1.67 m' },
            { label: 'Antec. Patológicos:', value: 'Sim' },
            { label: 'Neces. Psicobio.:', value: 'Sim' },
            { label: 'Diabetes:', value: 'Sim' },
            { label: 'Alergias:', value: 'Sim' },
            { label: 'Uso de prótese:', value: 'Sim' },
            { label: 'Medicamentos em uso:', value: 'Sim' }
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
      <ExpandableSection
        title="Necessidades Psicobiológicas"
        expanded={necessidadesExpanded}
        setExpanded={setNecessidadesExpanded}
      >
        <Grid container spacing={2}>
          {[
            { label: 'Padrão Respiratório:', value: 'Dispneico' },
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
      <ExpandableSection
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
      <ExpandableSection
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
      <ExpandableSection
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
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
          >
            Antecedentes Familiares:
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(antecedentesFamiliares).map((key) => (
              <Grid key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        antecedentesFamiliares[
                          key as keyof typeof antecedentesFamiliares
                        ]
                      }
                      onChange={(e) =>
                        setAntecedentesFamiliares({
                          ...antecedentesFamiliares,
                          [key]: e.target.checked
                        })
                      }
                      sx={{
                        color: '#1351B4',
                        '&.Mui-checked': { color: '#1351B4' }
                      }}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'black' }}>
                      {key}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
          >
            Antecedentes Pessoais:
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(antecedentesPessoais).map((key) => (
              <Grid key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        antecedentesPessoais[
                          key as keyof typeof antecedentesPessoais
                        ]
                      }
                      onChange={(e) =>
                        setAntecedentesPessoais({
                          ...antecedentesPessoais,
                          [key]: e.target.checked
                        })
                      }
                      sx={{
                        color: '#1351B4',
                        '&.Mui-checked': { color: '#1351B4' }
                      }}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'black' }}>
                      {key}
                    </Typography>
                  }
                />
              </Grid>
            ))}
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
            <TextField
              fullWidth
              multiline
              rows={2}
              defaultValue="Espiro, tosse e dor de cabeça"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#666',
                  '& fieldset': { borderColor: '#eee' }
                }
              }}
            />
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
            <TextField
              fullWidth
              multiline
              rows={2}
              defaultValue="Virose"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#666',
                  '& fieldset': { borderColor: '#eee' }
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <ExpandableSection
        title="Prescrição de Exames"
        expanded={prescricaoExamesExpanded}
        setExpanded={setPrescricaoExamesExpanded}
      >
        <Grid container spacing={1}>
          {Object.keys(examesPrescritos).map((key) => (
            <Grid size={{ xs: 12, sm: 4 }} key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      examesPrescritos[key as keyof typeof examesPrescritos]
                    }
                    onChange={(e) =>
                      setExamesPrescritos({
                        ...examesPrescritos,
                        [key]: e.target.checked
                      })
                    }
                    sx={{
                      color: '#1351B4',
                      '&.Mui-checked': { color: '#1351B4' }
                    }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {key.replace('Exame', 'Exame ')}
                  </Typography>
                }
              />
            </Grid>
          ))}
        </Grid>
      </ExpandableSection>
      <ExpandableSection
        title="Prescrição de Medicação"
        expanded={prescricaoMedicacaoExpanded}
        setExpanded={setPrescricaoMedicacaoExpanded}
      >
        <Grid container spacing={1}>
          {Object.keys(medicacoesPrescritas).map((key) => (
            <Grid size={{ xs: 12, sm: 4 }} key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      medicacoesPrescritas[
                        key as keyof typeof medicacoesPrescritas
                      ]
                    }
                    onChange={(e) =>
                      setMedicacoesPrescritas({
                        ...medicacoesPrescritas,
                        [key]: e.target.checked
                      })
                    }
                    sx={{
                      color: '#1351B4',
                      '&.Mui-checked': { color: '#1351B4' }
                    }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {key.replace('Medicacao', 'Medicação ')}
                  </Typography>
                }
              />
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
          Anotações
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Adicione suas anotações aqui..."
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#666',
              '& fieldset': { borderColor: '#eee' }
            }
          }}
        />
      </Paper>
    </Box>
  );
}
