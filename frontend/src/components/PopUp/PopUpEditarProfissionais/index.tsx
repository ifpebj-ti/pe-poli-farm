'use client';

import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from '@mui/material';

interface PopUpEditarProps {
  open: boolean;
  onClose: () => void;
  profissional?: {
    id: string;
    name: string;
    email: string;
    position: string;
    status: string;
  };
  onSave: (profissionalAtualizado: unknown) => void;
}

export default function PopUpEditar({
  open,
  onClose,
  profissional,
  onSave
}: PopUpEditarProps) {
  const [nome, setNome] = React.useState(profissional?.name || '');
  const [email, setEmail] = React.useState(profissional?.email || '');
  const [perfil, setPerfil] = React.useState(profissional?.position || '');
  const [status, setStatus] = React.useState(profissional?.status || '');

  React.useEffect(() => {
    if (profissional) {
      setNome(profissional.name);
      setEmail(profissional.email);
      setPerfil(profissional.position);
      setStatus(profissional.status);
    }
  }, [profissional]);

  const handleSave = () => {
    onSave({
      ...profissional,
      name: nome,
      email,
      position: perfil,
      status
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Informações do Profissional</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Nome Completo"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          select
          label="Perfil de Acesso"
          fullWidth
          margin="normal"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        >
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Médico">Médico</MenuItem>
          <MenuItem value="Recepcionista">Recepcionista</MenuItem>
          <MenuItem value="Recepcionista">Enfermeiro</MenuItem>
        </TextField>
        <TextField
          select
          label="Status do Usuário (Ativo / Inativo)"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="success">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
