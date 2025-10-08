'use client';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const historico = Array.from({ length: 7 }, () => ({
  resumoClinico: 'Gripe, paracetamol prescrito...',
  profissional: 'Dr. João',
  data: '17/07/2025',
  tipoAtendimento: 'Consulta Médica'
}));

export default function TabelaRelatorioPaciente() {
  return (
    <Box sx={{ px: 6, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0ecff' }}>
              <TableCell sx={{ paddingY: 1 }}>RESUMO CLINICO</TableCell>
              <TableCell sx={{ paddingY: 1 }}>PROFISSIONAL</TableCell>
              <TableCell sx={{ paddingY: 1 }}>DATA</TableCell>
              <TableCell sx={{ paddingY: 1 }}>TIPO DE ATENDIMENTO</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {historico.map((registro, index) => (
              <TableRow key={index}>
                <TableCell sx={{ paddingY: 1 }}>
                  {registro.resumoClinico}
                </TableCell>
                <TableCell sx={{ paddingY: 1 }}>
                  {registro.profissional}
                </TableCell>
                <TableCell sx={{ paddingY: 1 }}>{registro.data}</TableCell>
                <TableCell sx={{ paddingY: 1 }}>
                  {registro.tipoAtendimento}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
