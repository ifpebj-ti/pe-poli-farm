import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { Login } from './AuthService';

type decodeTokenType = {
  userId: string;
  active: boolean;
  email: string;
  IsUserUpdatePassword: boolean;
  position: string;
  role: string;
  unique_name: string;
  nbf: number;
  exp: number;
  iat: number;
};

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24
  },
  jwt: {
    maxAge: 60 * 60 * 24
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        try {
          const response = (await Login(
            credentials.email,
            credentials.password
          )) as AxiosResponse;

          if (response.status === 200) {
            const decodeToken: decodeTokenType = jwtDecode(response.data.token);
            const user: User = {
              id: decodeToken.userId,
              active: decodeToken.active,
              email: decodeToken.email,
              isUserUpdatePassword: decodeToken.IsUserUpdatePassword,
              position: decodeToken.position,
              role: decodeToken.role,
              unique_name: decodeToken.unique_name,
              token: response.data.token
            };
            return user;
          }

          return null;
        } catch (error) {
          console.error('Erro na autenticação:', error);
          throw new Error('Credenciais inválidas');
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.active = user.active;
        token.accessToken = user.token;
        token.email = user.email;
        token.IsUserUpdatePassword = user.isUserUpdatePassword;
        token.unique_name = user.unique_name;
        token.position = user.position;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.unique_name = token.unique_name;
      session.user.accessToken = token.accessToken;
      session.user.active = token.active;
      session.user.email = token.email;
      session.user.isUserUpdatePassword = token.isUserUpdatePassword;
      session.user.role = token.role;
      session.user.position = token.position as string;
      return session;
    }
  }
};
