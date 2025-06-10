// src/theme/ThemeRegistry.tsx
'use client';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

// Aqui você pode criar seu tema customizado do MUI se quiser
// Por enquanto, vamos usar o padrão
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline serve para normalizar os estilos, é uma boa prática */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}