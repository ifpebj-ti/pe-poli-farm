'use client';

import { useRouter } from 'next/navigation';
import React, { useMemo, useState, useEffect } from 'react';

// PopUps
import PopUpConfirmacaoAtivar from '@/src/components/PopUp/PopUpConfirmacaoAtivar';
import PopUpConfirmacaoDesativar from '@/src/components/PopUp/PopUpConfirmacaoDesativar';
import PopUpConfirmacao from '@/src/components/PopUp/PopUpConfirmaçãoProfissionais';
import PopUpEditar from '@/src/components/PopUp/PopUpEditarProfissionais';

// MUI
import { api } from '@/src/services/api';
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
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useProfissionais } from './hooks/UseProfissionais';

// 🔹 Interface para tipar os dados
interface Profissional {
  id: string;
  name: string;
  email: string;
  position: string;
  status: string;
}

// Componente da tela
export function CardProfissionais() {
  const router = useRouter();
  const { profissionais, isLoading, error } = useProfissionais();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDesativar, setOpenDesativar] = useState(false);
  const [openAtivar, setOpenAtivar] = useState(false);
  const [selectedProf, setSelectedProf] = useState<Profissional | null>(null);

  // 🔹 Estado da paginação
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 🔹 Lista filtrada (busca)
  const filteredProfissionais = useMemo(() => {
    const list = (profissionais as Profissional[]) || [];
    if (!searchTerm) return list;

    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [profissionais, searchTerm]);

  // 🔹 Cálculo de páginas totais com base na lista filtrada
  const totalPages = useMemo(() => {
    if (!filteredProfissionais || filteredProfissionais.length === 0) return 0;
    return Math.ceil(filteredProfissionais.length / rowsPerPage);
  }, [filteredProfissionais, rowsPerPage]);

  // 🔹 Garante que a página atual nunca fique acima do total
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // 🔹 Fatiar a lista para exibir só a página atual
  const currentPageProfissionais = useMemo(() => {
    if (!filteredProfissionais || filteredProfissionais.length === 0) return [];
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProfissionais.slice(startIndex, endIndex);
  }, [filteredProfissionais, page, rowsPerPage]);

  const handleDesativar = async () => {
    if (!selectedProf) {
      alert('Nenhum profissional selecionado!');
      return;
    }

    try {
      await api.patch(`/User/disable/${selectedProf.id}`);
      window.location.reload();
      alert(`Profissional ${selectedProf.name} desativado com sucesso!`);
    } catch (err) {
      console.error('Erro ao desativar profissional:', err);
      alert('Oxente! Deu um erro ao desativar o profissional.');
    } finally {
      setOpenDesativar(false);
      setSelectedProf(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f4f6f8', flexGrow: 1 }}>
      {/* Cabeçalho com Título e Barra de Busca */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 3
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          Profissionais Cadastrados
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Pesquise por nome ou email"
          sx={{
            width: { xs: '100%', sm: '300px' },
            backgroundColor: 'white'
          }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset página ao mudar busca
          }}
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
              {!isMobile && (
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              )}
              {!isMobile && (
                <TableCell sx={{ fontWeight: 'bold' }}>Perfil</TableCell>
              )}
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress />
                  <Typography>Carregando profissionais...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            ) : currentPageProfissionais.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography>Nenhum profissional encontrado.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentPageProfissionais.map((profissional) => (
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
                  {!isMobile && <TableCell>{profissional.email}</TableCell>}
                  {!isMobile && <TableCell>{profissional.position}</TableCell>}
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
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth={isMobile}
                        onClick={() => setOpenEdit(true)}
                      >
                        Editar
                      </Button>
                      {profissional.status === 'Ativo' ? (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          fullWidth={isMobile}
                          onClick={() => {
                            setSelectedProf(profissional);
                            setOpenDesativar(true);
                          }}
                        >
                          Desativar
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          fullWidth={isMobile}
                          onClick={() => {
                            setSelectedProf(profissional);
                            setOpenAtivar(true);
                          }}
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
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          mt: 3
        }}
      >
        {/* 🔹 Paginação só aparece se existir mais de 1 página */}
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              mr: { xs: 0, sm: '35%' },
              alignSelf: { xs: 'center', sm: 'end' }
            }}
            showFirstButton
            showLastButton
          />
        )}

        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            fontWeight: 'bold',
            borderRadius: 8,
            textTransform: 'none',
            px: 3,
            py: 1,
            width: { xs: '100%', sm: 'auto' }
          }}
          onClick={() => router.push('/CadastroUsuario')}
        >
          Novo Cadastro
        </Button>
      </Box>

      {/* Popups */}
      <PopUpEditar
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profissional={selectedProf || undefined}
        onSave={() => setOpenConfirm(true)}
      />
      <PopUpConfirmacao
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      />
      <PopUpConfirmacaoDesativar
        open={openDesativar}
        onClose={() => setOpenDesativar(false)}
        onConfirm={handleDesativar}
        profissionalNome={selectedProf?.name}
      />
      <PopUpConfirmacaoAtivar
        open={openAtivar}
        onClose={() => setOpenAtivar(false)}
        onConfirm={() => setOpenAtivar(false)}
        profissionalNome={selectedProf?.name}
      />
    </Box>
  );
}
