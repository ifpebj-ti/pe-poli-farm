import { getSession } from 'next-auth/react';

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

api.interceptors.request.use(
  async (config) => {
    // 1. Buscamos a sessão atual do NextAuth no lado do cliente.
    //    getSession é ideal aqui porque pode ser chamado fora de um componente React.
    const session = await getSession();

    // 2. Se a sessão existir e tiver nosso accessToken (o token do seu backend)
    if (session?.user?.accessToken) {
      // 3. Adicionamos o token ao cabeçalho 'Authorization' da requisição.
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    // 4. Retornamos a configuração modificada para que a requisição possa continuar.
    return config;
  },
  (error) => {
    // Lida com erros na configuração da requisição
    return Promise.reject(error);
  }
);
