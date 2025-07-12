'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

// Importações do Material-UI
import AssignmentIndOutlined from '@mui/icons-material/AssignmentIndOutlined';
import MailOutline from '@mui/icons-material/MailOutline';
import PersonOutline from '@mui/icons-material/PersonOutline';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress
} from '@mui/material';

// Importações de Ícones do Material-UI

import { useCadastroProfissional } from './hooks/useCadastroProfissional';

// --- Definição das opções para os Selects ---

const positionOptions = [
  'RECEPTION',
  'MANAGEMENT',
  'DOCTOR',
  'NURSE',
  'NURSING_TECHNICIAN',
  'PHYSIOTHERAPIST',
  'PSYCHOLOGIST',
  'NUTRITIONIST',
  'PHARMACEUTICAL',
  'OCCUPATIONAL_THERAPIST',
  'BIOCHEMICAL',
  'X_RAY_TECHNICIAN',
  'LABORATORY_TECHNICIAN'
];

const positionLabels: { [key: string]: string } = {
  RECEPTION: 'Recepção',
  MANAGEMENT: 'Gestão',
  DOCTOR: 'Médico(a)',
  NURSE: 'Enfermeiro(a)',
  NURSING_TECHNICIAN: 'Técnico(a) de Enfermagem',
  PHYSIOTHERAPIST: 'Fisioterapeuta',
  PSYCHOLOGIST: 'Psicólogo(a)',
  NUTRITIONIST: 'Nutricionista',
  PHARMACEUTICAL: 'Farmacêutico(a)',
  OCCUPATIONAL_THERAPIST: 'Terapeuta Ocupacional',
  BIOCHEMICAL: 'Bioquímico(a)',
  X_RAY_TECHNICIAN: 'Técnico(a) de Raio-X',
  LABORATORY_TECHNICIAN: 'Técnico(a) de Laboratório'
};

const roleOptions = [
  'ADMIN',
  'RECEPTIONTEAM',
  'DOCTOR',
  'NURSE',
  'INTITUATIONMANAGEMENT'
];

const roleLabels: { [key: string]: string } = {
  ADMIN: 'Administrador',
  RECEPTIONTEAM: 'Equipe de Recepção',
  DOCTOR: 'Médico',
  NURSE: 'Enfermagem',
  INTITUATIONMANAGEMENT: 'Gestão da Instituição'
};

// // --- Interface para os dados do formulário ---
// interface FormValues {
//   name: string;
//   email: string;
//   cpf: string;
//   position: string;
//   profile: {
//     role: string;
//   };
// }

export function CardCadastroUser() {
  const { form, handleCadastro } = useCadastroProfissional();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form;

  return (
    <Card className="flex flex-col justify-between bg-[#BED6EF] w-[478px] p-[30px] rounded-[20px] absolute right-[150px] self-center border-gray-600">
      <CardHeader
        title={
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ color: 'black', fontWeight: 'medium', my: 2 }}
          >
            Cadastro de Usuário
          </Typography>
        }
        sx={{ p: 0 }}
      />
      <CardContent sx={{ p: 0 }}>
        <form onSubmit={handleSubmit(handleCadastro)}>
          <Box display="flex" flexDirection="column" gap={2.5} mt={2}>
            {/* Campo Nome */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Nome Completo"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            {/* Campo Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            {/* Campo CPF (sem máscara) */}
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="CPF"
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndOutlined />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            {/* Campo Cargo (Position) */}
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.position}>
                  <InputLabel id="position-label">Cargo *</InputLabel>
                  <Select
                    {...field}
                    labelId="position-label"
                    aria-placeholder="Cargo *"
                    sx={{ backgroundColor: 'white' }}
                  >
                    {positionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {positionLabels[option] || option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.position?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Campo Perfil de Acesso (profile.role) */}
            <Controller
              name="profile.role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.profile?.role}>
                  <InputLabel id="role-label">Perfil de Acesso *</InputLabel>
                  <Select
                    {...field}
                    labelId="role-label"
                    label="Perfil de Acesso *"
                    sx={{ backgroundColor: 'white' }}
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {roleLabels[option] || option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.profile?.role?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                backgroundColor: '#1e40af',
                color: 'white',
                fontSize: '1.1rem',
                borderRadius: '8px',
                mt: 2,
                p: '10px 0',
                '&:hover': { backgroundColor: '#1c3896' }
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
