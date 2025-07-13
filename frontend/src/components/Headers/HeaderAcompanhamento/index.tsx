'use client';

import { useRouter } from 'next/navigation'; // Importe useRouter
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';

export default function AcompanhamentoHeader() {
  const [status, setStatus] = useState('');
  const router = useRouter(); // Inicialize useRouter

  const handleVoltarClick = () => {
    router.push('/Inicio'); // Navega para a página /Inicio
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 6,
        pb: 0,
        gap: 2.5
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          fontFamily: 'Roboto, sans-serif'
        }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontWeight: 400,
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Acompanhamento
        </Typography>

        {/* Campo de busca e botão */}
        <TextField
          placeholder="Pesquise pacientes"
          size="small"
          sx={{
            backgroundColor: '#f8f8f8',
            minWidth: 400,
            fontFamily: 'Roboto, sans-serif',
            '& .MuiOutlinedInput-root': {
              height: 50,
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ccc'
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <SearchIcon sx={{ color: '#1351B4', fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="andamento">Em Andamento</MenuItem>
              <MenuItem value="finalizado">Finalizado</MenuItem>
              <MenuItem value="suspenso">Suspenso</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="outlined"
          onClick={handleVoltarClick}
          sx={{
            height: 36,
            borderRadius: '18px',
            textTransform: 'none',
            px: 3,
            borderColor: '#1351B4',
            color: '#1351B4',
            fontWeight: 400,
            fontFamily: 'Roboto, sans-serif',
            minWidth: 90,
            '&:hover': {
              borderColor: '#0f479e',
              backgroundColor: '#f0f7ff'
            }
          }}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
}
