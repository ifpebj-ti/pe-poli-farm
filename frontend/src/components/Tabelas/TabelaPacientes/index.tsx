'use client';
import { useRouter } from 'next/navigation';

import { Patient } from '@/src/lib/pacientes';
import { calcularIdade, formatarHorario } from '@/src/lib/utils';
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

interface TabelaPacientesProps {
  pacientes: Patient[];
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function TabelaPacientes({
  pacientes,
  page,
  totalPages,
  onPageChange
}: TabelaPacientesProps) {
  const router = useRouter(); // Inicialize useRouter

  // Função para lidar com o clique no botão "Ver prontuário"
  const handleVerProntuarioClick = (patientId: string) => {
    // Navega para a TelaProntuario, passando o ID do paciente na URL
    router.push(`/TelaProntuario/${patientId}`);
  };

  if (pacientes.length === 0) {
    return (
      <Paper elevation={1} sx={{ mx: 4, mt: 3, p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Nenhum paciente encontrado.</Typography>
        <Typography color="textSecondary">
          Tente alterar os filtros ou o termo de busca.
        </Typography>
      </Paper>
    );
  }

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
              {pacientes.map((paciente) => {
                // Lida com o caso de não haver um primeiro serviço registrado
                const horarioEntrada =
                  paciente.services && paciente.services.length > 0
                    ? formatarHorario(paciente.services[0].serviceDate)
                    : 'N/A';

                const idade = calcularIdade(paciente.birthDate);

                return (
                  <TableRow key={paciente.id}>
                    <TableCell sx={{ paddingY: 1 }}>
                      <Typography
                        sx={{
                          color: '#1351B4',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {paciente.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {paciente.motherName || 'Não informado'}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>
                      {idade > 0 ? `${idade} anos` : 'Não informado'}
                    </TableCell>
                    <TableCell sx={{ paddingY: 1 }}>{horarioEntrada}</TableCell>
                    <TableCell align="right" sx={{ paddingY: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        // Chama a função passando o ID do paciente
                        onClick={() => handleVerProntuarioClick(paciente.id)}
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
                        Ver prontuário
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação agora dentro da largura da tabela */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={onPageChange}
              color="primary"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
