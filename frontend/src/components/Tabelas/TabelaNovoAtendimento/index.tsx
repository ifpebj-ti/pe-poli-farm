'use client';
import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const pacientes = Array.from({ length: 7 }, () => ({
  nome: `Nome Paciente`,
  nomeMae: 'Nome da mãe',
  idade: '36 anos e 2 meses',
  entrada: '13:00'
}));

export default function TabelaNovoAtendimento() {
  const router = useRouter(); // Inicialize useRouter

  const handleNovoPacienteClick = () => {
    router.push('/NovoPaciente'); // Navega para a página /NovoPaciente
  };

  const handleIniciarAtendimentoClick = (pacienteNome: string) => {
    router.push(`/TelaConsulta?paciente=${encodeURIComponent(pacienteNome)}`);
  };

  return (
    <Box sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                <TableCell sx={{ paddingY: 1 }}>PACIENTE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>NOME DA MÃE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>IDADE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>HORÁRIO DE ENTRADA</TableCell>
                <TableCell align="right" sx={{ paddingY: 1 }} />
              </TableRow>
            </TableHead>

            <TableBody>
              {pacientes.map((paciente, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ paddingY: 1 }}>
                    <Typography sx={{ color: '#1351B4', cursor: 'pointer' }}>
                      {paciente.nome}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.nomeMae}</TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.idade}</TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.entrada}</TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        handleIniciarAtendimentoClick(paciente.nome)
                      }
                      sx={{
                        backgroundColor: '#1351B4',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: 120,
                        height: 30,
                        '&:hover': {
                          backgroundColor: '#0f479e'
                        }
                      }}
                    >
                      Iniciar Atendimento
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação agora dentro da largura da tabela */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={5} page={1} color="primary" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNovoPacienteClick}
            sx={{
              borderColor: '#1351B4',
              color: '#1351B4',
              borderRadius: '50px', // Deixei bem arredondado como no print
              textTransform: 'none',
              fontWeight: 'bold',
              paddingX: 3,
              paddingY: 0.8,
              '&:hover': {
                backgroundColor: 'rgba(19, 81, 180, 0.04)',
                borderColor: '#1351B4'
              }
            }}
          >
            Novo Paciente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
