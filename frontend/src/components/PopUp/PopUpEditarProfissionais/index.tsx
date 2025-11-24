'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  AdminUpdateUser,
  AdminUpdateUserData
} from '@/src/services/UserService';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress
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
  onUpdateSuccess: () => void; // Callback para notificar o sucesso
}

export default function PopUpEditar({
  open,
  onClose,
  profissional,
  onUpdateSuccess
}: PopUpEditarProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profissional) {
      setNome(profissional.name || '');
      setEmail(profissional.email || '');
      setPerfil(profissional.position || '');
      setStatus(profissional.status || 'Inativo');
    }
  }, [profissional]);

  const handleSave = async () => {
    if (!profissional) return;

    setIsSaving(true);
    try {
      const payload: AdminUpdateUserData = {
        name: nome,
        email: email,
        isActive: status === 'Ativo'
        // profileId e password podem ser adicionados aqui se o formulário os suportar
      };

      await AdminUpdateUser(profissional.id, payload);

      toast.success('Profissional atualizado com sucesso!');
      onUpdateSuccess(); // Chama o callback para atualizar a lista
      onClose(); // Fecha o popup
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      toast.error(
        'Não foi possível atualizar o profissional. Tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
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
          disabled={isSaving}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSaving}
        />
        <TextField
          select
          label="Perfil de Acesso"
          fullWidth
          margin="normal"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          disabled={isSaving}
        >
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Médico">Médico</MenuItem>
          <MenuItem value="Recepcionista">Recepcionista</MenuItem>
          <MenuItem value="Enfermeiro">Enfermeiro</MenuItem>
        </TextField>
        <TextField
          select
          label="Status do Usuário (Ativo / Inativo)"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isSaving}
        >
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          disabled={isSaving}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          disabled={isSaving}
        >
          {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
