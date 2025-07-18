'use client';
import { useRouter } from 'next/navigation';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';

export default function RelatorioHeader() {
  const router = useRouter(); // Inicialize useRouter

  const handleVoltarClick = () => {
    router.push('/Inicio'); // Navega para a página /Inicio
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        px: 6,
        pt: 6,
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
        Relatório do Paciente
      </Typography>

      {/* Campo de busca e botão */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2
        }}
      >
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
