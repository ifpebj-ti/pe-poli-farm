'use client';

import { useState } from 'react';

import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Work,
  LocalHospital
} from '@mui/icons-material';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';

export default function MeusDadosForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    unidade: '',
    perfil: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mt: 5,
        px: 2,
        mx: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h4" sx={{ color: '#000' }}>
        Meus Dados
      </Typography>

      <TextField
        label="Nome:"
        name="nome"
        placeholder="João Antônio da Silva"
        value={form.nome}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          sx: { color: '#000' }
        }}
        helperText="Digite o nome pelo qual o usuário deseja ser identificado."
      />

      <TextField
        label="E-mail:"
        name="email"
        placeholder="drjoaoantonio@gmail.com"
        value={form.email}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          sx: { color: '#000' }
        }}
        helperText="Digite e-mail corporativo mais utilizado."
      />

      <TextField
        label="Senha:"
        name="senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="********"
        value={form.senha}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <VisibilityOff sx={{ color: '#1351B4' }} />
                ) : (
                  <Visibility sx={{ color: '#1351B4' }} />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          sx: { color: '#000' }
        }}
        helperText="A senha só pode ser redefinida pelo próprio usuário."
      />

      <TextField
        label="Perfil:"
        placeholder="Médico Cardiologista"
        value={form.perfil}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Work />
            </InputAdornment>
          ),
          readOnly: true
        }}
        InputLabelProps={{
          sx: { color: '#000' }
        }}
        helperText="Função pela qual a pessoa é identificada no sistema."
      />

      <TextField
        label="Tipo de Unidade:"
        placeholder="Policlínica"
        value={form.unidade}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalHospital />
            </InputAdornment>
          ),
          readOnly: true
        }}
        InputLabelProps={{
          sx: { color: '#000' }
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 3 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            px: 3,
            borderColor: '#1351B4',
            color: '#1351B4'
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            px: 3,
            backgroundColor: '#1351B4'
          }}
        >
          Alterar
        </Button>
      </Box>
    </Box>
  );
}
