import NovoAtendimentoHeader from "@/src/components/HeaderNovoAtendimento";
import NavBar from "@/src/components/NavBar";
import TabelaNovoAtendimento from "@/src/components/TabelaNovoAgendamento";
import { Box } from "@mui/material";

export default function NovoAtendimento() {
    return (
        <Box sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}>
            <NavBar />
            <NovoAtendimentoHeader />
            <TabelaNovoAtendimento />
        </Box>
    );
}