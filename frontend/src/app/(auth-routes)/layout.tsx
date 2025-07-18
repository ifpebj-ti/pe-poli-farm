import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

// import { MenuComponent } from '../../components/NavBar/MenuComponente';
// import { UserComponent } from '../../components/NavBar/PerfilComponente';

import { nextAuthOptions } from '@/src/services/authOptions';

export default async function PrivateLayout({
  children
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect('/');
  }

  if (session.user.isUserUpdatePassword === 'false') {
    redirect('/NovoAcesso');
  }

  return (
    <>
      <header></header>
      <main>{children}</main>
    </>
  );
}
