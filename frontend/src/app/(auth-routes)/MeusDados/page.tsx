'use client';
import React from "react";
import NavBar from "@/src/components/NavBar";
import { Box, Typography } from "@mui/material";
import MeusDadosForm from "@/src/components/Meusdados/page";

export default function MeusDados() {
    return (
        <Box sx={{ backgroundColor: 'white', minHeight: '100vh', minWidth: '100%' }}>
            <NavBar />
            <MeusDadosForm />
        </Box>
    );
}