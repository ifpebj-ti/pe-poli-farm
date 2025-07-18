'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import AppBar from '@mui/material/AppBar';

import Sidebar from '../SideBar';

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawer = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen(true);
  };

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: '#7AACDE', paddingY: 2 }}
        >
          {session?.user && (
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color: '#1351B4' }}
                onClick={handleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Stack
                direction="column"
                spacing={0}
                sx={{ flexGrow: 1, color: 'black' }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  ProntusVitale
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Controle consultas e dados de pacientes
                </Typography>
              </Stack>
              <Box
                sx={{
                  flexGrow: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: 'black'
                }}
              >
                <Avatar alt="Remy Sharp" sx={{ marginRight: 1.5 }} />
                <Stack direction="column" sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: '600' }}
                  >
                    {session.user.unique_name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {session.user.position}
                  </Typography>
                </Stack>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    router.push('/');
                    localStorage.removeItem('UserAuth');
                    handleLogout();
                  }} // Ajuste a rota de logout conforme necessário
                >
                  <FiLogOut />
                </IconButton>
              </Box>
            </Toolbar>
          )}
        </AppBar>
      </Box>
      <Sidebar open={sidebarOpen} onClose={handleDrawer} />
    </>
  );
}
