'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from '@mui/material';

interface NovoAtendimentoHeaderProps {
  termoBusca: string;
  onBuscaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  statusFiltro: string;
  onStatusChange: (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => void;
}

export default function NovoAtendimentoHeader({
  termoBusca,
  onBuscaChange,
  statusFiltro,
  onStatusChange
}: NovoAtendimentoHeaderProps) {
  const router = useRouter();

  const handleVoltarClick = () => {
    router.push('/Inicio');
  };
  return (
    <Box sx={{ px: { xs: 2, sm: 6 }, pb: 2 }}>
      <Typography variant="h4" sx={{ color: '#000', fontWeight: 500, mb: 3 }}>
        Novo Atendimento
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: { xs: 2, md: 0 }
        }}
      >
        {/* Botões de Filtro de Status */}
        <ToggleButtonGroup
          color="primary"
          value={statusFiltro}
          exclusive
          onChange={onStatusChange}
          aria-label="Filtro de status do atendimento"
          sx={{
            flexGrow: { xs: 1, md: 'auto' },
            width: { xs: '100%', md: 'auto' }
          }}
        >
          <ToggleButton value="NO_SERVICE">Aguardando Atendimento</ToggleButton>
          <ToggleButton value="IN_SERVICE">Em Atendimento</ToggleButton>
        </ToggleButtonGroup>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: { xs: '100%', md: 'auto' },
            alignItems: 'center'
          }}
        >
          {/* Campo de busca */}
          <TextField
            placeholder="Pesquise pacientes"
            size="small"
            value={termoBusca}
            onChange={onBuscaChange}
            sx={{
              backgroundColor: '#f8f8f8',
              flexGrow: 1,
              width: { xs: '100%', sm: 400 }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#1351B4' }} />
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
    </Box>
  );
}
