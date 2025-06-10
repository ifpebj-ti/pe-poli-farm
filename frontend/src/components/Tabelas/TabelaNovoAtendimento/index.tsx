'use client';
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
  cpf: '123.456.789-10',
  sus: 46743674,
  nomeMae: 'Maria José da Silva',
  entrada: '09:00'
}));

export default function TabelaNovoAtendimento() {
  return (
    <Box sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0ecff' }}>
                <TableCell sx={{ paddingY: 1 }}>PACIENTE</TableCell>
                <TableCell sx={{ paddingY: 1 }}>CPF</TableCell>
                <TableCell sx={{ paddingY: 1 }}>SUS</TableCell>
                <TableCell sx={{ paddingY: 1 }}>NOME DA MÃE</TableCell>
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
                  <TableCell sx={{ paddingY: 1 }}>{paciente.cpf}</TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.sus}</TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.nomeMae}</TableCell>
                  <TableCell sx={{ paddingY: 1 }}>{paciente.entrada}</TableCell>
                  <TableCell align="right" sx={{ paddingY: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
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
                      INICIAR ATENDIMENTO
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
      </Box>
    </Box>
  );
}
