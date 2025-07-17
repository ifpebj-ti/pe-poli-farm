import { useRouter } from 'next/navigation';

import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Paper, Typography, Button } from '@mui/material';

const weeklyData = [
  { day: 'SEX', date: '20/08/2021', value: 170 },
  { day: 'QUI', date: '19/08/2021', value: 60 },
  { day: 'QUA', date: '18/08/2021', value: 50 },
  { day: 'TER', date: '17/08/2021', value: 37 },
  { day: 'SEG', date: '16/08/2021', value: 28 }
];

// Função para encontrar o valor máximo, que será nossa referência para 100% da barra
const getMaxValue = () => {
  return Math.max(...weeklyData.map((item) => item.value));
};

export default function CardEstatistica() {
  const router = useRouter();
  const maxValue = getMaxValue();

  const handleVerEstatisticasClick = () => {
    router.push('/TelaEstatistica'); // Navega para /TelaEstatistica
  };

  return (
    // 2. O Card principal que envolve todo o componente
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: '100%', // Largura máxima para o card
        maxHeight: '100%', // Altura máxima para o card
        margin: 'auto' // Centraliza o card na página
      }}
    >
      {/* 3. Cabeçalho com Ícone e Títulos */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ScheduleIcon sx={{ color: 'primary.main', mr: 1.5 }} />
        <Box>
          <Typography variant="h6" component="h3">
            Resumo da Semana
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total de Atendimentos
          </Typography>
        </Box>
      </Box>

      {/* 4. A área do Gráfico de Barras */}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2, py: 1 }}
      >
        {weeklyData.map((item, index) => {
          // Calculamos a largura da barra em porcentagem
          const barWidth = (item.value / maxValue) * 100;

          return (
            // Container para cada linha do gráfico
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
            >
              {/* Labels da esquerda (Dia e Data) */}
              <Box sx={{ width: '18%' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item.day}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </Box>

              {/* A Barra de Progresso */}
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    width: `${barWidth}%`, // Largura dinâmica!
                    backgroundColor: 'primary.main',
                    borderRadius: 1,
                    padding: '4px 8px',
                    display: 'flex',
                    justifyContent: 'flex-end', // Alinha o número à direita
                    minWidth: '25px' // Garante que mesmo barras pequenas mostrem o valor
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* 5. O Botão de Ação */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleVerEstatisticasClick}
          href="/estatisticas"
        >
          Ver Estatísticas
        </Button>
      </Box>
    </Paper>
  );
}
