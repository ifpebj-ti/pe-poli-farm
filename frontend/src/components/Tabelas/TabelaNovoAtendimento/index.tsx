'use client';
import { useRouter } from 'next/navigation';

import { Patient } from '@/src/lib/pacientes';
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

interface TabelaProps {
  pacientes: Patient[];
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  onIniciarAtendimento: (paciente: Patient) => void;
}

const calcularIdade = (birthDateString: string): number => {
  if (!birthDateString) return 0;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formatarHorario = (dateString: string): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function TabelaNovoAtendimento({
  pacientes,
  page,
  totalPages,
  onPageChange,
  onIniciarAtendimento
}: TabelaProps) {
  const router = useRouter(); // Inicialize useRouter

  return (
    <Box sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
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
                      {paciente.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {paciente.motherName}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {calcularIdade(paciente.birthDate)}
                  </TableCell>
                  <TableCell sx={{ paddingY: 1 }}>
                    {formatarHorario(paciente.services[0]?.serviceDate)}
                  </TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onIniciarAtendimento(paciente)}
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
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pb: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={onPageChange}
              color="primary"
            />
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => router.push('/NovoPaciente')}
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
