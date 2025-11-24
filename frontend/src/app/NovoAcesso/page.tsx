import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import CardNovoAcesso from '@/src/components/Cards/CardNovoAcesso';

import { nextAuthOptions } from '@/src/services/authOptions';

export default async function NovaSenha() {
  const session = await getServerSession(nextAuthOptions);

  // 1. Se o usuário não estiver logado, manda para a página de login.
  if (!session) {
    redirect('/');
  }

  // 2. Se o usuário estiver logado, mas NÃO for seu primeiro acesso, manda para a página inicial.
  if (session.user.firstAccess !== 'True') {
    redirect('/Inicio');
  }

  // 3. Se o usuário estiver logado E for seu primeiro acesso, mostra a página.
  return (
    <div className="min-h-screen bg-[url('/Login.jpg')] bg-no-repeat bg-cover bg-center flex h-full">
      <CardNovoAcesso />
    </div>
  );
}
