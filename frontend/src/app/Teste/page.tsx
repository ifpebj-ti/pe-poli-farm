// import CardEstatistica from "@/src/components/CardEstatistica";
// import AgendamentoCard from "@/src/components/Cardagendamento";
// import PacientesHeader from "@/src/components/Headerpacientes";
// import MenuInicio from "@/src/components/MenuInicio";
// import MeusDadosForm from "@/src/components/Meusdados/page";
//import NavBar from "@/src/components/NavBar";
// import { Card } from "@mui/material";
// import TabelaPacientes from "@/src/components/TabelaPacientes";

//import TelaConsulta from '@/src/components/Consulta';
import { Box } from '@mui/material';

//import ConsultaCompletaPage from "../(auth-routes)/TelaConsulta/page";
//import TelaAgendamento from '@/src/components/Agendamento';
//import NavBar from '@/src/components/NavBar';
import ConsultaCompletaPage from '../(auth-routes)/TelaConsulta/page';

export default function Teste() {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* 
    <MenuInicio />
    <AgendamentoCard />
    <CardEstatistica />
    <PacientesHeader />
    <TabelaPacientes /> 
    <ConsultaCompletaPage />*/}
      <ConsultaCompletaPage />
    </Box>
  );
}
