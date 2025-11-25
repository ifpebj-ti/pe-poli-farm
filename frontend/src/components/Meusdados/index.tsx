'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import PopupMeusdados from '@/src/components/PopUp/PopUpMeusDados';

import { api } from '@/src/services/api';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Work
} from '@mui/icons-material';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';

interface UserForm {
  name: string;
  email: string;
  password: string;
  profileId: string; // Importante para o envio
  profileName: string; // Apenas para exibição
}

export default function MeusDados() {
  const [showPassword, setShowPassword] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    profileId: '',
    profileName: ''
  });

  useEffect(() => {
    // Verifica se a sessão já carregou e tem dados de usuário
    if (session && session.user) {
      console.log('Dados da sessão:', session.user); // Ótimo para debugar!

      // ATENÇÃO AQUI: Adapte os nomes das propriedades para bater com o que vem na sua sessão.
      // Ex: session.user.profileId ou session.user.profile?.id
      setForm({
        name: session.user.unique_name || '',
        email: session.user.email || '',
        password: '', // Senha sempre começa vazia
        profileId: session.user.id || '', // << VERIFIQUE ESSE CAMPO
        profileName: session.user.position || 'Perfil não informado' // << VERIFIQUE ESSE CAMPO
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAlterar = async () => {
    // Monta o payload SÓ com os campos que a API espera
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      name: form.name,
      email: form.email,
      profileId: form.profileId,
      isActive: true // A API espera esse campo
    };

    // Só adiciona a senha no payload se o usuário tiver digitado algo
    if (form.password) {
      payload.password = form.password;
    }

    try {
      console.log('Enviando payload:', payload);
      await api.patch('/User/me/update', payload);
      setOpenPopup(true); // Abre o popup de sucesso
    } catch (err) {
      setError('Eita, não foi possível alterar os dados. Tenta de novo.');
      console.error(err);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    router.push('/Inicio'); // Volta pra tela inicial após o sucesso
  };

  const handleVoltarClick = () => {
    router.push('/Inicio');
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 500,
          mt: 3,
          mx: 'auto', // Centraliza o Box horizontalmente
          px: { xs: 2, sm: 4 }, // Espaçamento horizontal responsivo
          display: 'flex',
          flexDirection: 'column',
          gap: 3 // Espaçamento entre os elementos
        }}
      >
        <Typography variant="h4" sx={{ color: '#000' }}>
          Meus Dados
        </Typography>

        <TextField
          label="Nome:"
          name="name"
          value={form.name}
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
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
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
          value={form.profileName}
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

        {/* <TextField
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
        /> */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'stretch', sm: 'flex-end' },
            mt: 2,
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            onClick={handleVoltarClick}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 3,
              borderColor: '#1351B4',
              color: '#1351B4',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={handleAlterar}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 3,
              backgroundColor: '#1351B4',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Alterar
          </Button>
        </Box>
      </Box>

      <PopupMeusdados open={openPopup} onClose={handleClosePopup} />
    </>
  );
}
