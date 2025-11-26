import { Box, Typography } from '@mui/material';

export default function CardResumoClinico() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mx: 6,
        px: 5,
        py: 1,
        border: '1px solid #999999',
        borderRadius: '10px'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 500, color: '#000', mb: 2 }}>
        Resumo Clínico:
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 500, color: '#000' }}>
        Ultimo atendimento: 10/07/2025 com Dr.João
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 500, color: '#000' }}>
        Hipoteses Medicas: Rinite; Gripe
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 500, color: '#000' }}>
        Medicamentos Prescritos: Ibuprofeno
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 500, color: '#000' }}>
        Procedimentos Realizados: Curativo Simples
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 500, color: '#000' }}>
        Atestados Emitidos: Nenhum
      </Typography>
    </Box>
  );
}
