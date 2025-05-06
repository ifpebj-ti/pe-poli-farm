import React from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function CardSair() {
  const route = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Sair</h2>
        <p className="mb-4">Você tem certeza que deseja sair?</p>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => { signOut(); route.push("/"); }}>
          Sair
        </button>
      </div>
    </div>
  );
}