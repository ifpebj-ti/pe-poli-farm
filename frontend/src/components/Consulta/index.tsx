'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PopupAtestado from '@/src/components/PopUp/PopupAtestado';
import PopupPrescricaoExame from '@/src/components/PopUp/PopupPrescricaoExame';
import PopupPrescricaoMedicacao from '@/src/components/PopUp/PopupPrescricaoMedicacao';

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

export default function TelaConsulta() {
  const [openMedicacaoPopup, setOpenMedicacaoPopup] = useState(false);
  const [openExamePopup, setOpenExamePopup] = useState(false);
  const [openAtestadoPopup, setOpenAtestadoPopup] = useState(false);
  const router = useRouter();

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px'
    }
  };

  const buttonStyles = {
    borderRadius: '20px',
    fontWeight: 500,
    px: 3,
    minWidth: 130
  };

  const patientData = {
    nome: 'Laura Oliveira',
    cpf: '123.456.789-10',
    sus: '46743674'
  };

  const handleAgendamentoClick = () => {
    router.push('/TelaAgendamento');
  };

  return (
    <>
      <Box sx={{ p: 4, bgcolor: '#fff', minHeight: '100vh' }}>
        {/* Dados do Paciente */}
        <Typography variant="h6" color="black" sx={{ mb: 2 }}>
          Dados do paciente
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid size={4}>
            <TextField
              label="Nome"
              fullWidth
              defaultValue={patientData.nome}
              sx={inputStyles}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="CPF"
              fullWidth
              defaultValue={patientData.cpf}
              sx={inputStyles}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="SUS"
              fullWidth
              defaultValue={patientData.sus}
              sx={inputStyles}
            />
          </Grid>
        </Grid>
        {/* Anamnese */}
        <Typography variant="h6" color="black" sx={{ mb: 2 }}>
          Anamnese
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid size={2}>
            <TextField label="Pressão Art." fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Glicose" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Temperatura" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Peso" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Freq. Card." fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Freq. Resp." fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Tipo Sang." fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Saturação" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Altura" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={2}>
            <TextField label="Diabetes" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={4}>
            <TextField label="Neces. Psicobiol." fullWidth sx={inputStyles} />
          </Grid>
        </Grid>
        {/* Necessidades Psicobiológicas */}
        <Typography variant="h6" color="black" sx={{ mb: 2 }}>
          Necessidades Psicobiológicas
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid size={4}>
            <Typography color="grey.700"> Padrão Respiratório: </Typography>
            <Select
              fullWidth
              defaultValue="Eupneico"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Eupneico">Eupneico</MenuItem>
              <MenuItem value="Dispneico">Dispneico</MenuItem>
              <MenuItem value="Taquipneico">Taquipneico</MenuItem>
              <MenuItem value="Bradipneico">Bradipneico</MenuItem>
              <MenuItem value="Apneico">Apneico</MenuItem>
              <MenuItem value="Cheyne-Stokes">Cheyne-Stokes</MenuItem>
              <MenuItem value="Kussmaul">Kussmaul</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </Grid>
          <Grid size={4}>
            <Typography color="grey.700"> Ausculta Pulmonar: </Typography>
            <Select
              fullWidth
              defaultValue="Murmúrio Vesicular Presente"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Murmúrio Vesicular Presente">
                Murmúrio Vesicular Presente (MV+)
              </MenuItem>
              <MenuItem value="Murmúrio Vesicular Diminuído">
                Murmúrio Vesicular Diminuído
              </MenuItem>
              <MenuItem value="Murmúrio Vesicular Abolido">
                Murmúrio Vesicular Abolido
              </MenuItem>
              <MenuItem value="Roncos">Roncos</MenuItem>
              <MenuItem value="Sibilos">Sibilos</MenuItem>
              <MenuItem value="Creptos">Creptos</MenuItem>
              <MenuItem value="Estridor">Estridor</MenuItem>
              <MenuItem value="Atrito Pleural">Atrito Pleural</MenuItem>
              <MenuItem value="MV com Ruídos Adventícios">
                MV com Ruídos Adventícios
              </MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
            </Select>
          </Grid>
          <Grid size={4}>
            <Typography color="grey.700"> Coloração da pele: </Typography>
            <Select
              fullWidth
              defaultValue="Normocorada"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Normocorada">Normocorada</MenuItem>
              <MenuItem value="Pálida">Pálida</MenuItem>
              <MenuItem value="Cianótica">Cianótica</MenuItem>
              <MenuItem value="Ictérica">Ictérica</MenuItem>
              <MenuItem value="Ruborizada">Ruborizada</MenuItem>
              <MenuItem value="Hipocorada">Hipocorada</MenuItem>
              <MenuItem value="Hiperemiada">Hiperemiada</MenuItem>
            </Select>
          </Grid>
        </Grid>
        {/* Neuro */}
        <Typography variant="h6" color="black" sx={{ mb: 2 }}>
          Neuro
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid size={4}>
            <Typography sx={{ color: 'grey.700' }}>
              Bulhas Cardíacas:
            </Typography>
            <Select
              fullWidth
              defaultValue="Normofonéticas"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Normofonéticas">Normofonéticas (BNF)</MenuItem>
              <MenuItem value="Hipofonéticas">Hipofonéticas</MenuItem>
              <MenuItem value="Hiperfonéticas">Hiperfonéticas</MenuItem>
              <MenuItem value="Arrítmicas">Arrítmicas</MenuItem>
              <MenuItem value="Com Sopros">Com Sopros</MenuItem>
              <MenuItem value="Com 3ª Bulha">Com 3ª Bulha (B3)</MenuItem>
              <MenuItem value="Com 4ª Bulha">Com 4ª Bulha (B4)</MenuItem>
              <MenuItem value="Ruídos Dissociados">Ruídos Dissociados</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </Grid>
          <Grid size={4}>
            <Typography sx={{ color: 'grey.700' }}>Pulso:</Typography>
            <Select
              fullWidth
              defaultValue="Presente, Rítmico, Cheio"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Presente, Rítmico, Cheio">
                Presente, Rítmico, Cheio
              </MenuItem>
              <MenuItem value="Presente, Rítmico, Fraco">
                Presente, Rítmico, Fraco
              </MenuItem>
              <MenuItem value="Presente, Arrítmico">
                Presente, Arrítmico
              </MenuItem>
              <MenuItem value="Ausente">Ausente</MenuItem>
              <MenuItem value="Filiforme">Filiforme</MenuItem>
              <MenuItem value="Salto">Salto (Martelo d&apos;água)</MenuItem>
              <MenuItem value="Alternante">Alternante</MenuItem>
              <MenuItem value="Paradoxal">Paradoxal</MenuItem>
            </Select>
          </Grid>
          <Grid size={4}>
            <Typography sx={{ color: 'grey.700' }}>Ritmo Cardíaco:</Typography>
            <Select
              fullWidth
              defaultValue="Sinusal"
              sx={{
                ...inputStyles['& .MuiOutlinedInput-root'],
                borderRadius: '10px'
              }}
            >
              <MenuItem value="Sinusal">Sinusal</MenuItem>
              <MenuItem value="Taquicardia Sinusal">
                Taquicardia Sinusal
              </MenuItem>
              <MenuItem value="Bradicardia Sinusal">
                Bradicardia Sinusal
              </MenuItem>
              <MenuItem value="Fibrilação Atrial">Fibrilação Atrial</MenuItem>
              <MenuItem value="Flutter Atrial">Flutter Atrial</MenuItem>
              <MenuItem value="Taquicardia Supraventricular">
                Taquicardia Supraventricular (TSV)
              </MenuItem>
              <MenuItem value="Taquicardia Ventricular">
                Taquicardia Ventricular (TV)
              </MenuItem>
              <MenuItem value="Fibrilação Ventricular">
                Fibrilação Ventricular (FV)
              </MenuItem>
              <MenuItem value="Assistolia">Assistolia</MenuItem>
              <MenuItem value="Bradicardia">Bradicardia</MenuItem>
              <MenuItem value="Taquicardia">Taquicardia</MenuItem>
              <MenuItem value="Outro Ritmo">Outro Ritmo</MenuItem>
            </Select>
          </Grid>
        </Grid>
        {/* Exame Neurológico */}
        <Typography variant="h6" color="black" sx={{ mb: 2 }}>
          Exame Neurológico
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
            <Typography sx={{ color: 'grey.700' }}>Resposta Motora:</Typography>
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
          <Grid size={4}>
            <TextField label="Alergias" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={4}>
            <TextField label="Antec. Patológicos" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={4}>
            <TextField label="Medicamentos em uso" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={6}>
            <TextField label="Sinais e Sintomas" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={6}>
            <TextField label="Cirurgias Prévias" fullWidth sx={inputStyles} />
          </Grid>
          <Grid size={12}>
            <TextField label="Hipótese Médica" fullWidth sx={inputStyles} />
          </Grid>
        </Grid>
        {/* Prescrições */}
        <Grid
          container
          mb={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <Grid size={6} sx={{ mr: 12 }}>
            <Typography variant="h6" color="black">
              Prescrição de Medicação
            </Typography>
            <Button
              onClick={() => setOpenMedicacaoPopup(true)}
              variant="contained"
              sx={{ ...buttonStyles, mt: 1, textTransform: 'uppercase' }}
            >
              ADICIONAR
            </Button>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" color="black">
              Prescrição de Exames
            </Typography>
            <Button
              onClick={() => setOpenExamePopup(true)}
              variant="contained"
              sx={{ ...buttonStyles, mt: 1, textTransform: 'uppercase' }}
            >
              ADICIONAR
            </Button>
          </Grid>
        </Grid>
        {/* Botões finais */}
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

      {/* Pop-ups */}
      <PopupPrescricaoMedicacao
        open={openMedicacaoPopup}
        onClose={() => setOpenMedicacaoPopup(false)}
      />

      <PopupPrescricaoExame
        open={openExamePopup}
        onClose={() => setOpenExamePopup(false)}
      />

      <PopupAtestado
        open={openAtestadoPopup}
        onClose={() => setOpenAtestadoPopup(false)}
        patientData={patientData}
      />
    </>
  );
}
