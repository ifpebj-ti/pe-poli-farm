/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import PopupAgendamentoSucesso from '@/src/components/PopUp/PopUpConfirmaçãoAgendamento';

import { Profissional } from '@/src/lib/profissionais';
import { api } from '@/src/services/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';

import { useAppointments } from './hooks/useAppointments';
import { useCreateAppointment } from './hooks/useCreateAppointment';

// --- COMPONENTE PRINCIPAL ---
export default function TelaAgendamentoContent() {
  // --- Estados do Componente ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filtro, setFiltro] = useState('mês');
  const { appointments, isLoading, error, refetch } = useAppointments(
    currentDate,
    filtro
  );
  const {
    createNewAppointment,
    isLoading: isCreating,
    error: createError
  } = useCreateAppointment();

  const [formState, setFormState] = useState({
    patientCpf: '',
    professionalCpf: '',
    specialty: '',
    data: '',
    hora: '',
    observacao: ''
  });

  const eventos = appointments.map((app) => {
    const start = new Date(app.start);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min duration
    return {
      start,
      end,
      title: app.title
    };
  });

  const [openConfirmacao, setOpenConfirmacao] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAgendar = async () => {
    const { data, hora, specialty, patientCpf, professionalCpf } = formState;

    // Basic validation
    if (!patientCpf || !professionalCpf || !specialty || !data || !hora) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // 1. Fetch patient by CPF to get patientId
      const patientResponse = await api.get(`/Patient/${patientCpf}`);
      const patientId = patientResponse.data.id;

      if (!patientId) {
        alert('Paciente não encontrado com o CPF fornecido.');
        return;
      }

      // 2. Fetch all professionals and find the one with the matching CPF
      const professionalsResponse =
        await api.get<Profissional[]>('/User/GetAll');
      const professional = professionalsResponse.data.find(
        (p) => p.cpf === professionalCpf
      );

      if (!professional) {
        alert('Profissional não encontrado com o CPF fornecido.');
        return;
      }
      const professionalId = professional.id;

      // 3. Create appointment data with the fetched IDs
      const scheduledAt = `${data}T${hora}:00.000`;
      const appointmentData = {
        patientId,
        professionalId,
        specialty,
        scheduledAt,
        status: 0
      };

      await createNewAppointment(appointmentData);
      setOpenConfirmacao(true);
      refetch();
    } catch (err) {
      console.error('Erro ao agendar consulta:', err);
      alert(
        'Ocorreu um erro ao tentar agendar a consulta. Verifique os dados e tente novamente.'
      );
    }
  };

  // --- Constantes e Helpers ---
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const step = direction === 'prev' ? -1 : 1;

    switch (filtro) {
      case 'dia':
        newDate.setDate(newDate.getDate() + step);
        break;
      case 'semana':
        newDate.setDate(newDate.getDate() + 7 * step);
        break;
      case 'mês':
        newDate.setMonth(newDate.getMonth() + step, 1);
        break;
      case 'ano':
        newDate.setFullYear(newDate.getFullYear() + step);
        break;
    }
    setCurrentDate(newDate);
  };
  const goToToday = () => setCurrentDate(new Date());

  const getWeekDays = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // =================================================================
  // --- Funções de Renderização (DENTRO do componente) ---
  // =================================================================

  const calculateDayLayout = (events: any[]) => {
    const sortedEvents = events.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
    const layout: any[] = [];
    const columns: any[][] = [];

    sortedEvents.forEach((event) => {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const lastEventInColumn = columns[i][columns[i].length - 1];
        if (lastEventInColumn.end.getTime() <= event.start.getTime()) {
          columns[i].push(event);
          layout.push({ ...event, col: i, totalCols: 0 });
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
        layout.push({ ...event, col: columns.length - 1, totalCols: 0 });
      }
    });

    layout.forEach((event) => {
      const overlappingEvents = layout.filter(
        (e) => event.start < e.end && event.end > e.start
      );
      event.totalCols =
        overlappingEvents.length > 1
          ? Math.max(...overlappingEvents.map((e) => e.col)) + 1
          : 1;
    });

    return layout;
  };

  const renderAgendaDia = () => {
    const hours = Array.from({ length: 15 }, (_, i) => i + 7);
    const diaEventos = eventos.filter(
      (e) => e.start.toDateString() === currentDate.toDateString()
    );

    const eventLayout = calculateDayLayout(diaEventos);
    const colors = ['#e6f7e6', '#e6e6f7', '#f7e6e6', '#f7f7e6'];

    return (
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          borderTop: '1px solid #eee',
          overflowX: 'auto'
        }}
      >
        <Box sx={{ width: '60px', flexShrink: 0, pt: '15px' }}>
          {hours.map((hour) => (
            <Box
              key={hour}
              sx={{
                height: '60px',
                textAlign: 'right',
                pr: 1,
                fontSize: '0.8em',
                color: '#666',
                position: 'relative'
              }}
            >
              <Typography
                variant="caption"
                sx={{ position: 'relative', top: '-0.7em' }}
              >
                {hour}:00
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: '300px',
            borderLeft: '1px solid #eee',
            position: 'relative'
          }}
        >
          {hours.map((hour) => (
            <Box
              key={hour}
              sx={{ height: '60px', borderBottom: '1px solid #eee' }}
            />
          ))}
          {eventLayout.map((evento, idx) => {
            const topPosition =
              (evento.start.getHours() - 7) * 60 + evento.start.getMinutes();
            const height =
              (evento.end.getTime() - evento.start.getTime()) / (1000 * 60);
            const width = 100 / evento.totalCols;
            const left = evento.col * width;

            return (
              <Paper
                key={idx}
                sx={{
                  position: 'absolute',
                  top: `${topPosition}px`,
                  left: `${left}%`,
                  width: `${width}%`,
                  height: `${height}px`,
                  p: 1,
                  bgcolor: colors[evento.col % colors.length],
                  borderLeft: `4px solid ${colors[(evento.col + 1) % colors.length]}`,
                  zIndex: 2,
                  boxSizing: 'border-box'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {evento.title}
                </Typography>
                <Typography variant="caption">
                  {evento.start.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>
    );
  };
  const renderAgendaSemanal = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 15 }, (_, i) => i + 7);
    const colors = ['#e6f7e6', '#e6e6f7', '#f7e6e6', '#f7f7e6'];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          <Box sx={{ width: '60px', flexShrink: 0 }} />
          {weekDays.map((day) => (
            <Box
              key={day.toISOString()}
              sx={{
                flex: 1,
                textAlign: 'center',
                p: 1,
                borderBottom: '1px solid #eee',
                borderLeft: '1px solid #eee'
              }}
            >
              <Typography variant="caption">
                {diasDaSemana[day.getDay()]}
              </Typography>
              <Typography variant="h6">{day.getDate()}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'auto'
          }}
        >
          <Box sx={{ width: '60px', flexShrink: 0 }}>
            {hours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  height: '60px',
                  textAlign: 'right',
                  pr: 1,
                  fontSize: '0.8em',
                  color: '#666'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ position: 'relative', top: '-0.7em' }}
                >
                  {hour}:00
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              position: 'relative',
              minWidth: '400px'
            }}
          >
            {' '}
            {hours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  position: 'absolute',
                  top: `${(hour - 7) * 60}px`,
                  left: 0,
                  right: 0,
                  height: '60px',
                  borderBottom: '1px solid #eee'
                }}
              />
            ))}
            {weekDays.map((day, dayIndex) => {
              const dayEvents = eventos.filter(
                (e) => e.start.toDateString() === day.toDateString()
              );
              const dayLayout = calculateDayLayout(dayEvents);

              return (
                <Box
                  key={day.toISOString()}
                  sx={{
                    flex: 1,
                    borderLeft: '1px solid #eee',
                    position: 'relative'
                  }}
                >
                  {dayLayout.map((evento, idx) => {
                    const topPosition =
                      (evento.start.getHours() - 7) * 60 +
                      evento.start.getMinutes();
                    const height =
                      (evento.end.getTime() - evento.start.getTime()) /
                      (1000 * 60);
                    const width = 100 / evento.totalCols;
                    const left = evento.col * width;

                    return (
                      <Paper
                        key={idx}
                        sx={{
                          position: 'absolute',
                          top: `${topPosition}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          height: `${height}px`,
                          p: '2px 4px',
                          bgcolor: colors[evento.col % colors.length],
                          zIndex: 2,
                          fontSize: '0.75rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        {evento.title}
                      </Paper>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderAgendaMes = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const firstDayOfMonth = new Date(year, month, 1);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const calendarDays: Date[] = Array.from({ length: 42 }, (_, i) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      return day;
    });
    const eventDates = new Set(eventos.map((e) => e.start.toDateString()));
    const selectedDayEvents = eventos.filter(
      (e) => e.start.toDateString() === currentDate.toDateString()
    );

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <Grid container>
            {diasDaSemana.map((dia) => (
              <Grid
                key={dia}
                sx={{
                  width: `${100 / 7}%`,
                  textAlign: 'center',
                  p: 1,
                  color: '#666',
                  fontWeight: 'bold'
                }}
              >
                {dia}
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {calendarDays.map((day) => {
              const isCurrentMonth = day.getMonth() === month;
              const isSelected =
                day.toDateString() === currentDate.toDateString();
              const isToday = day.toDateString() === today.toDateString();
              const hasEvent = eventDates.has(day.toDateString());

              return (
                <Grid
                  key={day.toISOString()}
                  sx={{
                    width: `${100 / 7}%`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60px',
                    borderTop: '1px solid #eee',
                    borderLeft: day.getDay() === 0 ? 'none' : '1px solid #eee'
                  }}
                >
                  <Box
                    onClick={() => setCurrentDate(day)}
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      bgcolor: isSelected ? '#1976d2' : 'transparent',
                      border:
                        isToday && !isSelected ? '1px solid #1976d2' : 'none',
                      color: isSelected
                        ? 'white'
                        : isCurrentMonth
                          ? 'black'
                          : '#ccc',
                      '&:hover': { bgcolor: isSelected ? '#1565c0' : '#f5f5f5' }
                    }}
                  >
                    <Typography variant="body1">{day.getDate()}</Typography>
                    {hasEvent && (
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          bgcolor: isSelected ? 'white' : '#1976d2',
                          mt: '2px'
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ px: 1, fontWeight: 'bold' }}>
          Compromissos para{' '}
          {currentDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long'
          })}
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1 }}>
          {selectedDayEvents.length > 0 ? (
            <List>
              {selectedDayEvents.map((evento, idx) => (
                <ListItem key={idx} disablePadding>
                  <Box
                    component="span"
                    sx={{ fontSize: '1.2em', mr: 2, color: 'primary.main' }}
                  >
                    •
                  </Box>
                  <ListItemText
                    primary={evento.title}
                    secondary={`${evento.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
              Nenhum compromisso para este dia.
            </Typography>
          )}
        </Box>
      </Box>
    );
  };
  const renderAgendaAno = () => {
    const year = currentDate.getFullYear();
    const anoEventos = eventos
      .filter((e) => e.start.getFullYear() === year)
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    return (
      <Box sx={{ height: '100%', overflowY: 'auto' }}>
        {anoEventos.length > 0 ? (
          <List>
            {anoEventos.map((evento, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={evento.title}
                  secondary={evento.start.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4, color: '#666' }}>
            Nenhum agendamento para o ano de {year}.
          </Typography>
        )}
      </Box>
    );
  };

  const handleCancelarClick = () => {
    router.push('/Inicio'); // Navigate to the Inicio page
  };
  // --- O CÓDIGO A SER RENDERIZADO COMEÇA AQUI ---
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: 'white',
        minHeight: 'calc(100vh - 112px)',
        // Responsividade: muda de flex-row para flex-col em telas pequenas
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}
    >
      <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '400px' } }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 500, color: 'black' }}
        >
          Agendamento
        </Typography>
        <Paper sx={{ p: 2, borderRadius: '10px', boxShadow: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="CPF do Paciente:"
                name="patientCpf"
                value={formState.patientCpf}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="CPF do Profissional:"
                name="professionalCpf"
                value={formState.professionalCpf}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Especialidade:"
                name="specialty"
                value={formState.specialty}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Data:"
                type="date"
                name="data"
                value={formState.data}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Hora:"
                type="time"
                name="hora"
                value={formState.hora}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Observação:"
                name="observacao"
                value={formState.observacao}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                gap: 2
              }}
            >
              <Button
                variant="contained"
                onClick={handleCancelarClick}
                sx={{
                  backgroundColor: '#f44336',
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 5,
                  height: 40,
                  '&:hover': { backgroundColor: '#d32f2f' },
                  flex: 1 // Faz o botão ocupar o espaço disponível
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0E930B',
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 5,
                  height: 40,
                  '&:hover': { backgroundColor: '#086506' },
                  flex: 1
                }}
                onClick={handleAgendar}
                disabled={isCreating}
              >
                {isCreating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Agendar'
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {createError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {createError}
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 2.5, display: 'flex', flexDirection: 'column' }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: '10px',
            boxShadow: 3,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              // Responsividade: envolve os botões em telas pequenas
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' }, // Alinha no topo em telas pequenas
              mb: 2,
              gap: { xs: 2, sm: 0 } // Espaçamento entre os elementos
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ textTransform: 'none' }}
                onClick={goToToday}
              >
                Hoje
              </Button>
              <IconButton onClick={() => handleNavigation('prev')} size="small">
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleNavigation('next')} size="small">
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
              <Typography variant="h6">
                {filtro === 'ano'
                  ? currentDate.getFullYear()
                  : `${meses[currentDate.getMonth()]} de ${currentDate.getFullYear()}`}
              </Typography>
            </Box>
            <Box>
              {['dia', 'semana', 'mês', 'ano'].map((option) => (
                <Button
                  key={option}
                  variant={filtro === option ? 'contained' : 'text'}
                  onClick={() => setFiltro(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 10
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            {!isLoading && !error && (
              <>
                {filtro === 'dia' && renderAgendaDia()}
                {filtro === 'semana' && renderAgendaSemanal()}
                {filtro === 'mês' && renderAgendaMes()}
                {filtro === 'ano' && renderAgendaAno()}
              </>
            )}
          </Box>
        </Paper>
      </Box>
      {/* POP-UP INTEGRADO E CONECTADO */}
      <PopupAgendamentoSucesso
        open={openConfirmacao}
        handleClose={() => setOpenConfirmacao(false)}
      />
    </Box>
  );
}
