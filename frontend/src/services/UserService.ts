import { api } from "./api";

export async function FindUserByEmail(email: string) {
  const response = await api.get('/Auth', {
    params: { email },
    // withCredentials: true // ESSENCIAL pra cookies!
  });

  return response.data;
}
