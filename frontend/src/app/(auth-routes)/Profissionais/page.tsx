import BreadCrumb from '@/src/components/BreadCrumb';
import { CardProfissionais } from '@/src/components/Cards/CardProfissionais';
import NavBar from '@/src/components/NavBar';

import { Box } from '@mui/material';

const linkList = [
  {
    label: 'Profissionais',
    href: '#'
  }
];

export default function TelaProfissionais() {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <NavBar />
      <Box sx={{ mt: 4, ml: 6, mr: 6 }}>
        <BreadCrumb linkList={linkList} />
        <CardProfissionais />
      </Box>
    </Box>
  );
}
