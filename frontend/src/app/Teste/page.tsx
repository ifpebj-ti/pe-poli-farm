import AgendamentoCard from "@/src/components/Cardagendamento";
import MenuInicio from "@/src/components/MenuInicio";
import MeusDadosForm from "@/src/components/Meusdados/page";
import NavBar from "@/src/components/NavBar";
import { Box } from "@mui/material";
import React from "react";

export default function Teste() {
  return (<Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
    <NavBar />
    <MeusDadosForm />
  </Box >
  );
}