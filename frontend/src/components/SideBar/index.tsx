'use client';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

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
                Nome do Usuário
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Cargo do Usuário
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
                onClick={() => handleListItemClick(0)}
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
                onClick={() => handleListItemClick(1)}
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
              João Antônio da Silva
            </Typography>
            <Typography variant="body2" color="green" fontWeight="bold">
              Acesso Público
            </Typography>

            <ListItemButton sx={{ mt: 1, color: '#1351B4' }}>
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
