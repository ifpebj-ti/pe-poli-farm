import { api } from './api';

export async function FindUserByEmail(email: string) {
  const response = await api.get('/Auth', {
    params: { email }
    // withCredentials: true // ESSENCIAL pra cookies!
  });

  return response.data;
}

export async function PutUser(data: {
  email: string;
  accessCode: string;
  password: string;
}) {
  const response = await api.put('/Auth', data, {
    // withCredentials: true // ESSENCIAL pra cookies!
  });

  return response.data;
}

export async function PostUser(data: {
  name: string;
  email: string;
  cpf: string;
  position: string;
  profile: {
    role: string;
  };
}) {
  const response = await api.post('/User', data);

  return response.data;
}
