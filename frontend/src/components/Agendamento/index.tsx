'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import PopupAgendamentoSucesso from '@/src/components/PopUp/PopUpConfirmaçãoAgendamento';

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
  Divider
} from '@mui/material';

// Interfaces
interface Evento {
  date: Date;
  titulo: string;
}

// --- COMPONENTE PRINCIPAL ---
export default function TelaAgendamentoContent() {
  // --- Estados do Componente ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos] = useState<Evento[]>([
    {
      date: new Date(new Date().setHours(8, 50, 0, 0)),
      titulo: 'Ana Paula - Consulta'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      titulo: 'Reunião de Equipe'
    }
  ]);
  const [filtro, setFiltro] = useState('mês');
  const [openConfirmacao, setOpenConfirmacao] = useState(false);
  const router = useRouter();

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

  const renderAgendaDia = () => {
    const hours = Array.from({ length: 15 }, (_, i) => i + 7);
    const diaEventos = eventos.filter(
      (e) => e.date.toDateString() === currentDate.toDateString()
    );

    return (
      <Box
        // Responsividade: permite rolagem horizontal
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
          }} // Adicionado minWidth
        >
          {hours.map((hour) => (
            <Box
              key={hour}
              sx={{ height: '60px', borderBottom: '1px solid #eee' }}
            />
          ))}
          {diaEventos.map((evento, idx) => {
            const topPosition =
              (evento.date.getHours() - 7) * 60 + evento.date.getMinutes();
            return (
              <Paper
                key={idx}
                sx={{
                  position: 'absolute',
                  top: `${topPosition}px`,
                  left: '5px',
                  right: '5px',
                  p: 1,
                  bgcolor: '#e6f7e6',
                  borderLeft: '4px solid #0E930B',
                  zIndex: 2
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {evento.titulo}
                </Typography>
                <Typography variant="caption">
                  {evento.date.toLocaleTimeString('pt-BR', {
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
            {weekDays.map((day) => (
              <Box
                key={day.toISOString()}
                sx={{
                  flex: 1,
                  borderLeft: '1px solid #eee',
                  position: 'relative'
                }}
              >
                {eventos
                  .filter((e) => e.date.toDateString() === day.toDateString())
                  .map((evento, idx) => {
                    const topPosition =
                      (evento.date.getHours() - 7) * 60 +
                      evento.date.getMinutes();
                    return (
                      <Paper
                        key={idx}
                        sx={{
                          position: 'absolute',
                          top: `${topPosition}px`,
                          left: '5px',
                          right: '5px',
                          p: '2px 4px',
                          bgcolor: '#e6f7e6',
                          zIndex: 2,
                          fontSize: '0.75rem'
                        }}
                      >
                        {evento.titulo}
                      </Paper>
                    );
                  })}
              </Box>
            ))}
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
    const eventDates = new Set(eventos.map((e) => e.date.toDateString()));
    const selectedDayEvents = eventos.filter(
      (e) => e.date.toDateString() === currentDate.toDateString()
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
                    primary={evento.titulo}
                    secondary={`${evento.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
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
      .filter((e) => e.date.getFullYear() === year)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
      <Box sx={{ height: '100%', overflowY: 'auto' }}>
        {anoEventos.length > 0 ? (
          <List>
            {anoEventos.map((evento, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={evento.titulo}
                  secondary={evento.date.toLocaleDateString('pt-BR', {
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
  const handleAgendar = () => {
    setOpenConfirmacao(true);
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
            <Grid size={12}>
              <TextField label="Nome Completo:" fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField label="Profissional:" fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField label="Motivo:" fullWidth />
            </Grid>
            <Grid size={6}>
              <TextField
                label="Data:"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label="Hora:"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField label="Observação:" multiline rows={4} fullWidth />
            </Grid>
            <Grid
              size={12}
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
              >
                Agendar
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            {filtro === 'dia' && renderAgendaDia()}
            {filtro === 'semana' && renderAgendaSemanal()}
            {filtro === 'mês' && renderAgendaMes()}
            {filtro === 'ano' && renderAgendaAno()}
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
