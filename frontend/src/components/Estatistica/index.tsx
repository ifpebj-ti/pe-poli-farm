'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';

interface DataItem {
  day?: string;
  date: string;
  value: number;
}
interface ResumoItem {
  day: string;
  date: string;
  value: number;
}

interface EspecialidadeItem {
  name: string;
  value: number;
  color: string;
}

interface PacienteAtendidoItem {
  date: string;
  value: number;
}

interface MetricaItem {
  title: string;
  value: number;
  bgColor: string;
}

interface UsuariosAtivos {
  active: number;
  total: number;
}

// A função do gráfico de semicírculo pode ficar fora do componente, pois não depende de estado ou props dele.
const renderHalfDonutChart = (activeValue: number, totalValue: number) => {
  const percentage = totalValue > 0 ? (activeValue / totalValue) * 100 : 0;
  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const activeStrokeLength = (percentage / 100) * (circumference / 2);
  const dashoffsetStart = circumference / 2;
  const currentDashoffset = dashoffsetStart - activeStrokeLength;

  return (
    <Box sx={{ position: 'relative', width: 100, height: 70, mt: 2 }}>
      <svg
        viewBox="0 0 100 70"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeDashoffset={circumference / 2}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#4285F4"
          strokeWidth={strokeWidth}
          strokeDasharray={`${activeStrokeLength} ${circumference}`}
          strokeDashoffset={currentDashoffset}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
      </svg>
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}
      >
        {activeValue}
      </Typography>
    </Box>
  );
};

export default function EstatisticasSistema() {
  // --- Estados para os filtros ---
  const [dataFiltro, setDataFiltro] = useState('Data - 01/04');
  const [especialidadeFiltro, setEspecialidadeFiltro] = useState(
    'Especialidades - Todos'
  );

  // --- Estados para os dados dos gráficos e cards ---
  const [isLoading, setIsLoading] = useState(true);
  const [resumoSemana, setResumoSemana] = useState<ResumoItem[]>([]);
  const [especialidades, setEspecialidades] = useState<EspecialidadeItem[]>([]);
  const [pacientesAtendidos, setPacientesAtendidos] = useState<
    PacienteAtendidoItem[]
  >([]);
  const [metricas, setMetricas] = useState<MetricaItem[]>([]);
  const [mediaDiaria, setMediaDiaria] = useState<DataItem[]>([]);
  const [usuariosAtivos, setUsuariosAtivos] = useState<UsuariosAtivos>({
    active: 0,
    total: 100
  });

  const router = useRouter();

  // useEffect para buscar os dados quando os filtros mudam
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      console.log('Buscando dados com os filtros:', {
        data: dataFiltro,
        especialidade: especialidadeFiltro
      });

      // =================================================================
      // AQUI VOCÊ FARIA A CHAMADA PARA A API REAL
      // =================================================================
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula espera da rede

      const mockApiData = {
        resumoSemanaData: [
          { day: 'SEX', date: '20/08/2021', value: 170 },
          { day: 'QUI', date: '19/08/2021', value: 80 },
          { day: 'QUA', date: '18/08/2021', value: 50 },
          { day: 'TER', date: '17/08/2021', value: 37 },
          { day: 'SEG', date: '16/08/2021', value: 28 }
        ],
        especialidadesData: [
          { name: 'Clínica Geral', value: 95, color: '#1A4D7C' },
          { name: 'Enfermagem', value: 70, color: '#4285F4' },
          { name: 'Cardiologia', value: 80, color: '#1A4D7C' },
          { name: 'Ginecologia', value: 30, color: '#4285F4' }
        ],
        totalPacientesAtendidosData: [
          { date: '8 de jul.', value: 100 },
          { date: '9 de jul.', value: 1200 },
          { date: '10 de jul.', value: 2500 },
          { date: '11 de jul.', value: 4000 }
        ],
        metricCards: [
          { title: 'Total de Atendimentos', value: 400, bgColor: '#1A4D7C' },
          {
            title: 'Procedimentos Registrados',
            value: 309,
            bgColor: '#1A4D7C'
          },
          { title: 'Absenteísmo', value: 20, bgColor: '#1A4D7C' },
          { title: 'Atestados Emitidos', value: 360, bgColor: '#1A4D7C' }
        ],
        novoGraficoData: [
          { day: 'SEG', date: '23/08/2021', value: 50 },
          { day: 'TER', date: '24/08/2021', value: 65 },
          { day: 'QUA', date: '25/08/2021', value: 90 },
          { day: 'QUI', date: '26/08/2021', value: 120 },
          { day: 'SEX', date: '27/08/2021', value: 150 }
        ],
        usuariosAtivosData: { active: 75, total: 100 }
      };

      setResumoSemana(mockApiData.resumoSemanaData);
      setEspecialidades(mockApiData.especialidadesData);
      setPacientesAtendidos(mockApiData.totalPacientesAtendidosData);
      setMetricas(mockApiData.metricCards);
      setMediaDiaria(mockApiData.novoGraficoData);
      setUsuariosAtivos(mockApiData.usuariosAtivosData);

      setIsLoading(false);
    };

    fetchDashboardData();
  }, [dataFiltro, especialidadeFiltro]);

  // --- Constantes para os gráficos (calculadas a partir do estado) ---
  const maxResumoSemanaValue = Math.max(...resumoSemana.map((d) => d.value), 0);
  const maxEspecialidadeValue = 100;
  const maxPacientesValue = 4000;
  const minPacientesValue = 100;
  const yAxisLabels = [4000, 3000, 2000, 1000, 100];
  const maxNovoGraficoValue = Math.max(...mediaDiaria.map((d) => d.value), 0);

  const handleVoltarClick = () => {
    router.push('/Inicio'); // Navega para a página /Inicio
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'normal', color: 'black' }}>
          Estatística do Sistema
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Filtro de Data */}
          <TextField
            select
            size="small"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            sx={{ width: 150, bgcolor: 'white' }}
            SelectProps={{ IconComponent: ArrowDropDownIcon }}
            InputLabelProps={{ shrink: false }}
          >
            <MenuItem value="Data - 01/04">Data - 01/04</MenuItem>
            <MenuItem value="Data - 01/05">Data - 01/05</MenuItem>
          </TextField>
          {/* Filtro de Especialidades com todas as opções */}
          <TextField
            select
            size="small"
            value={especialidadeFiltro}
            onChange={(e) => setEspecialidadeFiltro(e.target.value)}
            sx={{ width: 200, bgcolor: 'white' }}
            SelectProps={{ IconComponent: ArrowDropDownIcon }}
            InputLabelProps={{ shrink: false }}
          >
            <MenuItem value="Especialidades - Todos">
              Especialidades - Todos
            </MenuItem>
            <MenuItem value="Cardiologia">Cardiologia</MenuItem>
            <MenuItem value="Clínica Geral">Clínica Geral</MenuItem>
            <MenuItem value="Enfermagem">Enfermagem</MenuItem>
            <MenuItem value="Ginecologia">Ginecologia</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleVoltarClick}
            sx={{
              bgcolor: '#1351B4',
              textTransform: 'none',
              borderRadius: '25px',
              px: 3
            }}
          >
            Voltar
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Carregando estatísticas...</Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ flexGrow: 1, justifyContent: 'center' }}
        >
          {/* PAINEL 1: Resumo da Semana */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '10px',
                boxShadow: 1,
                height: '100%',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
              >
                Resumo da Semana
              </Typography>
              {resumoSemana.map((item, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: '80px',
                      flexShrink: 0,
                      mr: 1,
                      textAlign: 'left'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        lineHeight: 1.2,
                        fontWeight: 'bold'
                      }}
                    >
                      {item.day}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#666', lineHeight: 1.2 }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 20,
                      bgcolor: '#F5F5F5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${(item.value / maxResumoSemanaValue) * 100}%`,
                        bgcolor: '#1A4D7C',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        pr: 1
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* PAINEL 2: Total de Pacientes por Especialidades */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '10px',
                boxShadow: 1,
                height: '100%',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
              >
                Total de Pacientes por Especialidades
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '200px',
                  pt: 2,
                  gap: 1
                }}
              >
                {especialidades.map((item, index) => (
                  <Box key={index} sx={{ textAlign: 'center', flexShrink: 0 }}>
                    <Box
                      sx={{
                        height: `${(item.value / maxEspecialidadeValue) * 100}%`,
                        minHeight: '5%',
                        width: 40,
                        bgcolor: item.color,
                        borderRadius: '4px 4px 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        pb: 0.5
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        display: 'block',
                        color: '#666',
                        width: 60,
                        wordBreak: 'break-word',
                        textAlign: 'center'
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* PAINEL 3: Cards de Métricas */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Grid
              container
              spacing={2}
              direction="column"
              sx={{ height: '100%' }}
            >
              {metricas.map((card, index) => (
                <Grid size={{ xs: 12 }} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: '10px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.15)',
                      bgcolor: card.bgColor,
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100px'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'normal', mb: 0.5 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* PAINEL 4: Total de Pacientes Atendidos (Gráfico de Linha) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '10px',
                boxShadow: 1,
                height: '100%',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
              >
                Total de Pacientes Atendidos
              </Typography>
              <Box
                sx={{
                  height: 200,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  mb: 3,
                  pl: 4,
                  pt: 1
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 40,
                    width: 'calc(100% - 40px)',
                    height: 'calc(100% - 20px)',
                    borderLeft: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                    backgroundImage: `linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)`,
                    backgroundSize: `${100 / (pacientesAtendidos.length > 1 ? pacientesAtendidos.length - 1 : 1)}% 100%, 100% ${100 / (yAxisLabels.length - 1)}%`,
                    zIndex: 0
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 1,
                    pb: 2
                  }}
                >
                  {yAxisLabels.map((label, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      sx={{
                        color: '#666',
                        transform:
                          idx === 0
                            ? 'translateY(-50%)'
                            : idx === yAxisLabels.length - 1
                              ? 'translateY(50%)'
                              : 'translateY(-50%)',
                        pr: 1,
                        textAlign: 'right'
                      }}
                    >
                      {label}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -25,
                    left: 40,
                    width: 'calc(100% - 40px)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    zIndex: 1
                  }}
                >
                  {pacientesAtendidos.map((point, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{ color: '#666' }}
                    >
                      {point.date}
                    </Typography>
                  ))}
                </Box>
                <svg
                  width="calc(100% - 40px)"
                  height="calc(100% - 20px)"
                  viewBox="0 0 100 200"
                  preserveAspectRatio="none"
                  style={{ position: 'absolute', top: 0, left: 40, zIndex: 2 }}
                >
                  <polyline
                    fill="none"
                    stroke="#4285F4"
                    strokeWidth="2"
                    points={pacientesAtendidos
                      .map((point, index) => {
                        const x =
                          pacientesAtendidos.length > 1
                            ? (index / (pacientesAtendidos.length - 1)) * 100
                            : 50;
                        const y =
                          200 -
                          ((point.value - minPacientesValue) /
                            (maxPacientesValue - minPacientesValue)) *
                            200;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  {pacientesAtendidos.map((point, index) => {
                    const x =
                      pacientesAtendidos.length > 1
                        ? (index / (pacientesAtendidos.length - 1)) * 100
                        : 50;
                    const y =
                      200 -
                      ((point.value - minPacientesValue) /
                        (maxPacientesValue - minPacientesValue)) *
                        200;
                    return (
                      <circle
                        key={`circle-${index}`}
                        cx={x}
                        cy={y}
                        r="2"
                        fill="#4285F4"
                        stroke="white"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </Box>
            </Paper>
          </Grid>
          {/* PAINEL 5: Usuários Ativos no Sistema */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '10px',
                boxShadow: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
              >
                Usuários Ativos no Sistema
              </Typography>
              {renderHalfDonutChart(
                usuariosAtivos.active,
                usuariosAtivos.total
              )}
              <Typography variant="body1" sx={{ mt: 2, color: 'black' }}>
                Total de Ativos
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                {usuariosAtivos.active}
              </Typography>
            </Paper>
          </Grid>

          {/* PAINEL 6: Média Diária de Atendimentos */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '10px',
                boxShadow: 1,
                height: '100%',
                bgcolor: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
              >
                Média Diária de Atendimentos
              </Typography>
              {mediaDiaria.map((item, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: '80px',
                      flexShrink: 0,
                      mr: 1,
                      textAlign: 'left'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        lineHeight: 1.2,
                        fontWeight: 'bold'
                      }}
                    >
                      {item.day}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#666', lineHeight: 1.2 }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 20,
                      bgcolor: '#F5F5F5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${(item.value / maxNovoGraficoValue) * 100}%`,
                        bgcolor: '#4285F4',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        pr: 1
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
