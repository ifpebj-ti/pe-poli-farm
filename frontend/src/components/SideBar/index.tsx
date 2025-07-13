'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavigation = (path: string, index: number) => {
    setSelectedIndex(index);
    router.push(path);
    onClose(); // Fecha o sidebar após a navegação
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Faz logout e redireciona para a página inicial
  };

  const user = session?.user;

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 320,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        role="presentation"
      >
        {/* Top Section */}
        <Box>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: 'black',
              paddingTop: 3,
              paddingLeft: 2,
              paddingBottom: 3
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="globe.svg"
              sx={{ marginRight: 1.5 }}
            />
            <Stack direction="column" sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 'bold' }}
              >
                {user?.unique_name || 'Usuário'}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {user?.position || 'Usuário'}
              </Typography>
            </Stack>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2, mr: 2, color: '#1351B4' }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          {/* Menu Items */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={() => handleNavigation('/Inicio', 0)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: 'white'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
                <ListItemIcon>
                  <KeyboardArrowRightIcon sx={{ ml: 3 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => handleNavigation('/MeusDados', 0)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: 'white'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Meus Dados" />
                <ListItemIcon>
                  <KeyboardArrowRightIcon sx={{ ml: 3 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {user?.role === 'ADMIN' && (
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={() => handleNavigation('/Profissionais', 1)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '& *': { color: 'white' }
                    }
                  }}
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuários do Sistema" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon sx={{ ml: 3 }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: '#f1f7f4', p: 2 }}>
          <Stack alignItems="center" spacing={1}>
            <Avatar
              src="/static/images/doctor.jpg"
              sx={{ width: 64, height: 64 }}
            />
            <Typography fontWeight="bold" textAlign="center">
              {user?.unique_name || 'Usuário'}
            </Typography>
            <Typography variant="body2" color="green" fontWeight="bold">
              {status === 'authenticated' ? 'Conectado' : 'Desconectado'}
            </Typography>

            <ListItemButton
              sx={{ mt: 1, color: '#1351B4' }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#1351B4' }} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}
