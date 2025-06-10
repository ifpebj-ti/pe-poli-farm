// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      active: boolean;
      email: string;
      firstAccess: string;
      position: string;
      role: string;
      unique_name: string;
    };
  }
  interface User {
    id: string;
    active: boolean;
    email: string;
    firstAccess: string;
    position?: string;
    role: string;
    token: string;
    unique_name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken: string;
    active: boolean;
    email: string;
    firstAccess: string;
    position?: string;
    role: string;
    unique_name: string;
  }
}
