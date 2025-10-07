import { cloneElement } from 'react';

import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Box, Button, Paper, Typography } from '@mui/material';

const menuItems = [
  {
    text: 'Pacientes',
    icon: <PersonIcon fontSize="large" />,
    link: '/Pacientes'
  },
  {
    text: 'Atendimento',
    icon: <BadgeIcon fontSize="large" />,
    link: '/NovoAtendimento'
  },
  {
    text: 'Histórico',
    icon: <DescriptionIcon fontSize="large" />,
    link: '/HistoricoExames'
  },
  {
    text: 'Acompanhamento',
    icon: <SupervisedUserCircleIcon fontSize="large" />,
    link: '/Acompanhamento'
  },
  {
    text: 'Relatório do Paciente',
    icon: <AssessmentIcon fontSize="large" />,
    link: '/Relatorio'
  }
];

export default function MenuInicio() {
  return (
    <Box
      sx={{
        display: 'flex',
        // Centraliza os itens quando a largura total não é usada
        justifyContent: 'center',
        gap: 2,
        flexWrap: 'wrap',
        backgroundColor: 'background.default',
        width: '100%',
        // Adiciona padding para que os itens não colem nas laterais em mobile
        px: { xs: 2, md: 0 }
      }}
    >
      {menuItems.map((item, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            // Ajuste de Largura Responsiva:
            // xs (Mobile): 100% de largura (um item por linha)
            // sm (Tablet): 48% de largura (dois itens por linha)
            // md (Desktop): '18%' (aproximação do 17% original, mas permitindo flexibilidade)
            width: { xs: '100%', sm: '48%', md: '18%' },
            boxShadow: 2,
            // Garante que o item ocupe a largura completa em mobile, mas permita a quebra em desktop
            flexGrow: 1,
            minWidth: { xs: 'auto', md: 150 }, // Largura mínima em desktop
            '&:hover': {
              elevation: 4,
              backgroundColor: 'action.hover'
            }
          }}
        >
          <Button
            fullWidth
            href={item.link}
            sx={{
              display: 'flex',
              // Altera a direção para vertical (ícone acima, texto abaixo)
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', // Centraliza o ícone e o texto verticalmente
              py: 3,
              px: 2,
              textTransform: 'none',
              color: 'text.primary',
              minHeight: 120 // Garante altura mínima para melhor clique
            }}
          >
            {/* O ícone é renderizado aqui */}
            {cloneElement(item.icon, {
              sx: { color: 'primary.main', mb: 1.5 }
            })}
            <Typography
              variant="body1"
              component="span"
              color="text.primary"
              sx={{ textAlign: 'center' }} // Centraliza o texto
            >
              {item.text}
            </Typography>
          </Button>
        </Paper>
      ))}
    </Box>
  );
}
