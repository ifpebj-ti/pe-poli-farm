'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleVoltarClick = () => {
    router.push('/Inicio');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, md: 6 }, // Padding responsivo
        pb: 0,
        gap: { xs: 2, md: 2.5 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Empilha em telas pequenas, alinha em linha em telas maiores
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' }, // Alinha no topo em telas pequenas, no centro em telas maiores
          backgroundColor: '#fff',
          fontFamily: 'Roboto, sans-serif',
          gap: { xs: 2, md: 0 }
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            width: { xs: '100%', md: 'auto' }
          }}
        >
          <TextField
            placeholder="Pesquise pacientes"
            size="small"
            sx={{
              backgroundColor: '#f8f8f8',
              flexGrow: 1,
              width: { xs: '100%', sm: 400 },
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
              width: { xs: '100%', sm: 'auto' },
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Empilha em telas pequenas
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }} size="small">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{ width: { xs: '100%', sm: 150 } }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="andamento">Em Andamento</MenuItem>
              <MenuItem value="finalizado">Finalizado</MenuItem>
              <MenuItem value="suspenso">Suspenso</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
