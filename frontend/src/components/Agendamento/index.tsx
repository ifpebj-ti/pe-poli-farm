'use client';

import { useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';

export default function TelaAgendamento() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 25));
  const [eventos, setEventos] = useState([
    {
      date: new Date(2025, 3, 25),
      hora: 8,
      titulo: 'Ana Paula - Consulta'
    }
  ]);
  const [filtro, setFiltro] = useState('semana');
  const [form, setForm] = useState({
    nome: '',
    profissional: '',
    motivo: '',
    data: '',
    hora: '',
    observacao: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgendar = () => {
    const dataObj = new Date(form.data + 'T' + form.hora);
    if (!isNaN(dataObj.getTime())) {
      setEventos([
        ...eventos,
        {
          date: dataObj,
          hora: dataObj.getHours(),
          titulo: `${form.nome} - ${form.motivo}`
        }
      ]);
      setForm({
        nome: '',
        profissional: '',
        motivo: '',
        data: '',
        hora: '',
        observacao: ''
      });
    } else {
      alert('Por favor, insira uma data e hora válidas.');
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const renderFiltro = () => {
    // Essa parte segue igual, sem modificações nos Grid que já usam xs corretamente
    // Você pode manter o resto da função renderFiltro como já está
    return null; // Por brevidade
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        gap: 6
      }}
    >
      <Box sx={{ flex: 1, maxWidth: '400px' }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: 'black' }}
        >
          Agendamento
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              name="nome"
              value={form.nome}
              onChange={handleInputChange}
              label="Nome Completo:"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="profissional"
              value={form.profissional}
              onChange={handleInputChange}
              label="Profissional:"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="motivo"
              value={form.motivo}
              onChange={handleInputChange}
              label="Motivo:"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="data"
              value={form.data}
              onChange={handleInputChange}
              label="Data:"
              type="date"
              InputLabelProps={{ shrink: true, style: { color: 'black' } }}
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="hora"
              value={form.hora}
              onChange={handleInputChange}
              label="Hora:"
              type="time"
              InputLabelProps={{ shrink: true, style: { color: 'black' } }}
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="observacao"
              value={form.observacao}
              onChange={handleInputChange}
              label="Observação:"
              fullWidth
              multiline
              rows={4}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid
            size={12}
            sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#f44336',
                borderRadius: '20px',
                textTransform: 'none',
                px: 5,
                height: 40,
                '&:hover': { backgroundColor: '#d32f2f' }
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAgendar}
              variant="contained"
              sx={{
                backgroundColor: '#0E930B',
                borderRadius: '20px',
                textTransform: 'none',
                px: 5,
                height: 40,
                '&:hover': { backgroundColor: '#086506' }
              }}
            >
              Agendar
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Grade de Horários e Calendário */}
      <Box
        sx={{
          flex: 2,
          bgcolor: '#fff',
          borderRadius: '10px',
          p: 3,
          boxShadow: 1
        }}
      >
        {/* Search bar at the top right */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 2,
            position: 'absolute', // Position absolutely within its parent
            top: 20, // Adjust top position
            right: 40, // Adjust right position
            width: '300px' // Set a specific width
          }}
        >
          <TextField
            placeholder="Pesquise pacientes"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: 'black' }} />
                </InputAdornment>
              ),
              style: { borderRadius: '20px', color: 'black' } // Rounded search bar
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#aaa' },
                '&.Mui-focused fieldset': { borderColor: '#555' }
              }
            }}
          />
        </Box>

        {/* Navigation and Filter Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            pt: 6 // Push content down to accommodate absolute search bar
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                color: 'black',
                borderColor: '#ddd'
              }}
            >
              Hoje
            </Button>
            <IconButton
              onClick={goToPreviousMonth}
              size="small"
              sx={{ color: 'black' }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={goToNextMonth}
              size="small"
              sx={{ color: 'black' }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['dia', 'semana', 'mês', 'ano'].map((option) => (
              <Button
                key={option}
                size="small"
                variant={filtro === option ? 'contained' : 'text'}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 2,
                  color: filtro === option ? 'white' : 'black', // White text for active, black for inactive
                  backgroundColor:
                    filtro === option ? '#f44336' : 'transparent', // Red for active, transparent for inactive
                  '&:hover': {
                    backgroundColor: filtro === option ? '#d32f2f' : '#f0f0f0' // Darker red on hover for active, light grey for inactive
                  }
                }}
                onClick={() => setFiltro(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Display Current Month and Year for Week View */}
        {filtro === 'semana' && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: -2 }}
          >
            <Typography variant="h6" sx={{ color: 'black' }}>
              {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>
          </Box>
        )}

        {renderFiltro()}

        {/* Compromissos */}
        <Paper
          sx={{
            p: 2,
            borderRadius: '10px',
            mt: 3,
            boxShadow: 'none',
            border: '1px solid #ddd'
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 500, color: 'black', mb: 1 }}
          >
            Compromissos
          </Typography>
          {eventos
            .filter(
              (event) =>
                event.date.getDate() === currentDate.getDate() &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
            )
            .map((evento, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{ mt: 1, color: 'black' }}
              >
                <Box component="span" sx={{ fontSize: '1.2em', mr: 1 }}>
                  •
                </Box>{' '}
                {evento.hora}:00 - {evento.hora + 1}:00 - {evento.titulo}
              </Typography>
            ))}
          {/* Add a default message if no appointments */}
          {eventos.filter(
            (event) =>
              event.date.getDate() === currentDate.getDate() &&
              event.date.getMonth() === currentDate.getMonth() &&
              event.date.getFullYear() === currentDate.getFullYear()
          ).length === 0 && (
            <Typography variant="body2" sx={{ mt: 1, color: 'black' }}>
              Nenhum compromisso para o dia selecionado.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
