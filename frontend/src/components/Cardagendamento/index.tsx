'use client';

import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const agendamentos = [
  { hora: '8:00 - 9:00 AM', nome: 'Ana Paula - Consulta' },
  { hora: '9:00 - 10:00 AM', nome: 'Ana Paula - Consulta' },
  { hora: '11:00 - 11:50 AM', nome: 'Ana Paula - Consulta' },
];

export default function AgendamentoCard() {
  return (
    <Card sx={{ maxWidth: "100%", boxShadow: 3 }}>
      <CardContent >
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarMonthOutlinedIcon fontSize="small" sx={{ mr: 1, color: '#1976d2' }} />
          Agendamento
        </Typography>

        <List dense>
          {agendamentos.map((item, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon fontSize="small" sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText
                primary={`${item.hora}`}
                secondary={item.nome}
                primaryTypographyProps={{ fontSize: 12 }}
                secondaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          sx={{ mt: 2, textTransform: 'none', fontWeight: 500, backgroundColor: '#1351B4', width: '50%', ml: '25%' }}
        >
          Consultar Agenda
        </Button>
      </CardContent>
    </Card>
  );
}
