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

export default function HistoricoExamesHeader() {
  const router = useRouter(); // Inicialize useRouter

  const handleVoltarClick = () => {
    router.push('/Inicio'); // Navega para a página /Inicio
  };
  return (
    <Box
      sx={{
        display: 'flex',
        // Muda para coluna em telas pequenas (xs) e volta para linha em telas médias (md)
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'flex-start' }, // Alinhamento consistente
        px: 6,
        pt: 6,
        backgroundColor: '#fff',
        fontFamily: 'Roboto, sans-serif',
        gap: { xs: 3, md: 0 } // Adiciona espaçamento vertical em telas pequenas
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
        Histórico de Exames
      </Typography>

      {/* Campo de busca e botão */}
      <Box
        sx={{
          display: 'flex',
          // Muda para coluna em telas pequenas (xs) e mantém a coluna em telas médias (md)
          flexDirection: 'column',
          alignItems: { xs: 'stretch', md: 'flex-end' }, // Estica a busca em telas pequenas
          gap: 2,
          // Garante que o container de busca ocupe 100% da largura em telas pequenas
          width: { xs: '100%', md: 'auto' }
        }}
      >
        <TextField
          placeholder="Pesquise pacientes"
          size="small"
          fullWidth // Adicionado para ocupar a largura total do container
          sx={{
            backgroundColor: '#f8f8f8',
            // Define a largura mínima/máxima para ser responsiva: 100% em mobile, volta para 400px em desktop
            minWidth: { xs: '100%', md: 400 },
            maxWidth: { xs: '100%', md: 400 }, // Garante que não ultrapasse 400px
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
            // Em telas pequenas, o botão deve se alinhar à direita (se o container estiver 'stretch')
            alignSelf: { xs: 'flex-end', md: 'flex-end' },
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
