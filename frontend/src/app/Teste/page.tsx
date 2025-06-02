import CardEstatistica from "@/src/components/CardEstatistica";
import AgendamentoCard from "@/src/components/Cardagendamento";
import MenuInicio from "@/src/components/MenuInicio";
import NavBar from "@/src/components/NavBar";
import { Card } from "@mui/material";
import React from "react";

export default function Teste() {
  return (<>
    <NavBar />
    <MenuInicio />
    <AgendamentoCard />
    <CardEstatistica />
  </>
  );
}