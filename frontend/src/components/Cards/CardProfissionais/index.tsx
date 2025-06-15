'use client';

import React from 'react';

// Importações do Material-UI
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Pagination
} from '@mui/material';

// Importações de Ícones do Material-UI

// --- Dados Fictícios (Mocados) ---
// Em uma aplicação real, estes dados viriam de uma chamada de API.
const mockProfissionais = [
  {
    id: 1,
    nome: 'João da Silva',
    email: 'joao@clinica.com',
    perfil: 'Médico',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    email: 'maria@farmacia.com',
    perfil: 'Farmacêutico',
    status: 'Inativo'
  },
  {
    id: 3,
    nome: 'João da Silva',
    email: 'joao@clinica.com',
    perfil: 'Farmacêutico',
    status: 'Inativo'
  },
  {
    id: 4,
    nome: 'Maria Oliveira',
    email: 'maria@farmacia.com',
    perfil: 'Enfermeiro',
    status: 'Ativo'
  }
];

// Componente da tela
export function CardProfissionais() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f6f8', flexGrow: 1 }}>
      {/* Cabeçalho com Título e Barra de Busca */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          Profissionais Cadastrados
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Pesquise profissionais"
          sx={{ width: '300px', backgroundColor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Tabela de Profissionais */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de profissionais">
          <TableHead sx={{ backgroundColor: '#eef2f6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Profissional</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Perfil</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProfissionais.map((profissional) => (
              <TableRow
                key={profissional.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: '#007bff',
                    fontWeight: 'medium',
                    cursor: 'pointer'
                  }}
                >
                  {profissional.nome}
                </TableCell>
                <TableCell>{profissional.email}</TableCell>
                <TableCell>{profissional.perfil}</TableCell>
                <TableCell>
                  <Chip
                    label={profissional.status}
                    color={
                      profissional.status === 'Ativo' ? 'success' : 'default'
                    }
                    size="small"
                    sx={{
                      color:
                        profissional.status === 'Ativo' ? 'white' : 'inherit',
                      backgroundColor:
                        profissional.status === 'Ativo' ? '#28a745' : '#6c757d'
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}
                  >
                    <Button variant="contained" color="primary" size="small">
                      Editar
                    </Button>
                    {profissional.status === 'Ativo' ? (
                      <Button variant="contained" color="error" size="small">
                        Desativar
                      </Button>
                    ) : (
                      <Button variant="contained" color="success" size="small">
                        Ativar
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação e Botão de Novo Cadastro */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 3
        }}
      >
        <Pagination count={5} color="primary" sx={{ mr: '35%' }} />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            fontWeight: 'bold',
            borderRadius: 8,
            textTransform: 'none',
            padding: '8px 16px'
          }}
        >
          Novo Cadastro
        </Button>
      </Box>
    </Box>
  );
}
