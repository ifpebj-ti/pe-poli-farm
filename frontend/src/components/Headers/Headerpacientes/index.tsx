'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';

type PacientesHeaderProps = {
  termoBusca: string;
  onBuscaChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function PacientesHeader({
  termoBusca,
  onBuscaChange
}: PacientesHeaderProps) {
  const router = useRouter();
  const handleVoltarClick = () => {
    router.push('/Inicio'); // Navega para a página /Inicio
  };
  return (
    <Box
      sx={{
        display: 'flex',
        // 1. Mudar de linha (md) para coluna (xs)
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'flex-start' }, // Alinhamento consistente
        // 2. Ajustar padding horizontal para evitar quebras em telas pequenas
        px: { xs: 3, sm: 6 },
        pt: 6,
        backgroundColor: '#fff',
        fontFamily: 'Roboto, sans-serif',
        // 3. Adicionar espaçamento vertical entre o título e a busca em mobile
        gap: { xs: 3, md: 0 }
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
        Pacientes
      </Typography>

      {/* Campo de busca e botão */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // 4. Esticar a busca e o botão em telas pequenas
          alignItems: { xs: 'stretch', md: 'flex-end' },
          gap: 2,
          // 5. Garantir que este container ocupe 100% da largura em mobile
          width: { xs: '100%', md: 'auto' }
        }}
      >
        <TextField
          placeholder="Pesquise pacientes"
          size="small"
          value={termoBusca}
          onChange={onBuscaChange}
          // Adicionado fullWidth para ocupar o espaço do container
          fullWidth
          sx={{
            backgroundColor: '#f8f8f8',
            // 6. Tornar minWidth responsivo: 100% em mobile, 400px em desktop
            minWidth: { xs: '100%', md: 400 },
            maxWidth: { xs: '100%', md: 400 }, // Limita a largura para desktop
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
            // 7. Alinhar o botão à direita em mobile (pois o container está em 'stretch')
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
