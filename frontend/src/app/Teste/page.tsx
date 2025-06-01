import AgendamentoCard from "@/src/components/Cardagendamento";
import MenuInicio from "@/src/components/MenuInicio";
import NavBar from "@/src/components/NavBar";
import React from "react";

export default function Teste() {
  return (<>
    <NavBar />
    <MenuInicio />
    <AgendamentoCard />
  </>
  );
}