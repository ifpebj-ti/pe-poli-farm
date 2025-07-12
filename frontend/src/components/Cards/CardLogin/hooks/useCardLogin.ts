'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify'; // Supondo que você use react-toastify

import { typeMyschema } from '../schemas/schema';

export function useCardLogin() {
  const router = useRouter();

  // A função submitForm agora é muito mais simples!
  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    try {
      // 1. Chamamos a função signIn do NextAuth, passando o nome do nosso provider ('credentials')
      //    e os dados que o usuário digitou.
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false // Muito importante: Evita o redirecionamento automático
      });

      console.log('Resultado do signIn:', result);

      // 2. Verificamos o resultado da tentativa de login
      if (result?.error) {
        // Se o login falhar (ex: authorize retornou null), o NextAuth nos informa aqui.
        toast.error('Email ou senha inválidos. Por favor, tente novamente.');
        console.error('Erro de login retornado pelo NextAuth:', result.error);
        return; // Interrompe a execução
      }

      if (result?.ok) {
        // 3. Login bem-sucedido!
        // A sessão agora foi criada pelo NextAuth.
        toast.success('Login efetuado com sucesso!');

        // AGORA, em vez de verificar o 'firstAccess' aqui, nós simplesmente
        // redirecionamos para uma página padrão de "logado".
        router.push('/Inicio');
      }
    } catch (error) {
      // Este catch lida com erros inesperados na chamada do signIn.
      console.error('Erro inesperado durante o signIn:', error);
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return {
    submitForm
  };
}
