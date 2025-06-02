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
    link: '/pacientes'
  },
  {
    text: 'Atendimento',
    icon: <BadgeIcon fontSize="large" />,
    link: '/atendimento'
  },
  {
    text: 'Histórico',
    icon: <DescriptionIcon fontSize="large" />,
    link: '/historico'
  },
  {
    text: 'Acompanhamento',
    icon: <SupervisedUserCircleIcon fontSize="large" />,
    link: '/acompanhamento'
  },
  {
    text: 'Relatório do Paciente',
    icon: <AssessmentIcon fontSize="large" />,
    link: '/relatorio-paciente'
  }
];

export default function MenuInicio() {
    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2, // Espaçamento entre os cartões
            flexWrap: 'wrap', // Permite que os itens quebrem a linha em telas menores
            backgroundColor: 'background.default', // Cor de fundo do menu
            width: '100%', // Largura total do menu
        }}
        >
        {menuItems.map((item, index) => (
            <Paper
            key={index}
            elevation={2} // Controla a sombra do cartão
            sx={{
                width: "17%", // Largura fixa para cada cartão
                boxShadow: 2, // Sombra do cartão
                '&:hover': {
                elevation: 4,
                backgroundColor: 'action.hover',
                },
            }}
            >
            <Button
                fullWidth
                href={item.link} // Define o link de navegação do botão
                sx={{
                display: 'flex',
                flexDirection: 'row', // Organiza ícone e texto na vertical
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 3, // Padding vertical
                px: 2, // Padding horizontal
                textTransform: 'none', // Remove a transformação para maiúsculas
                color: 'text.primary', // Cor do texto
                }}
            >
                {/* O ícone é renderizado aqui */}
                {React.cloneElement(item.icon, { sx: { color: 'primary.main'} })}
                <Typography variant="body1" component="span" color='primary.main'>
                {item.text}
                </Typography>
            </Button>
            </Paper>
        ))}
        </Box>
    );
}
