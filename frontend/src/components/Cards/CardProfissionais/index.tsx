'use client';

import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

// Importações do Material-UI
import { useDebounce } from '@/src/app/(auth-routes)/Pacientes/hooks/useDebounce';
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
  Pagination,
  CircularProgress
} from '@mui/material';

import { useProfissionais } from './hooks/UseProfissionais';

// Importações de Ícones do Material-UI

// Componente da tela
export function CardProfissionais() {
  const router = useRouter();
  const { profissionais, isLoading, error } = useProfissionais();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredProfissionais = useMemo(() => {
    if (!debouncedSearchTerm) {
      return profissionais;
    }
    return profissionais.filter(
      (p) =>
        p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [profissionais, debouncedSearchTerm]);

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
          placeholder="Pesquise por nome ou email"
          sx={{ width: '300px', backgroundColor: 'white' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                  <Typography>Carregando profissionais...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProfissionais.map((profissional) => (
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
                    {profissional.name}
                  </TableCell>
                  <TableCell>{profissional.email}</TableCell>
                  <TableCell>{profissional.position}</TableCell>
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
                          profissional.status === 'Ativo'
                            ? '#28a745'
                            : '#6c757d'
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
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                        >
                          Ativar
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
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
          onClick={() => router.push('/CadastroUsuario')}
        >
          Novo Cadastro
        </Button>
      </Box>
    </Box>
  );
}
