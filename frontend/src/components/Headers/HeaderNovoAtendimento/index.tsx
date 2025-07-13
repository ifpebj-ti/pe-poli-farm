'use client';

import { ChangeEvent } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
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
  return (
    <Box sx={{ px: 6, pb: 2 }}>
      <Typography variant="h4" sx={{ color: '#000', fontWeight: 500, mb: 3 }}>
        Novo Atendimento
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Botões de Filtro de Status */}
        <ToggleButtonGroup
          color="primary"
          value={statusFiltro}
          exclusive
          onChange={onStatusChange}
          aria-label="Filtro de status do atendimento"
        >
          <ToggleButton value="NO_SERVICE">Aguardando Atendimento</ToggleButton>
          <ToggleButton value="IN_SERVICE">Em Atendimento</ToggleButton>
        </ToggleButtonGroup>

        {/* Campo de busca */}
        <TextField
          placeholder="Pesquise pacientes"
          size="small"
          value={termoBusca}
          onChange={onBuscaChange}
          sx={{ backgroundColor: '#f8f8f8', minWidth: 400 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#1351B4' }} />
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
}
