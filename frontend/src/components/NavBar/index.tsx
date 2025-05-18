import React from 'react';
import { Avatar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { FiLogOut } from 'react-icons/fi';


export default function NavBar() {
  const Nome = "Nome do Usuário";
  const Cargo = "Cargo do Usuário";
 return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: '#7AACDE', paddingY: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#1351B4' }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="column" spacing={0} sx={{ flexGrow: 1, color: 'black' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Prontuário Eletrônico para Farmácias e Policlínicas
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                Controle consultas e dados de pacientes
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'black' }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{marginRight:1.5}}/>
            <Stack direction="column" sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                    {Nome}
                </Typography>
                <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                    {Cargo}
                </Typography>
            </Stack>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
                sx={{ ml: 2 }}
            >
                <FiLogOut />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}