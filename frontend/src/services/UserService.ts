import { api } from "./api";

export async function FindUserByEmail(email: string) {
  const response = await api.get('/Auth', {
    params: {
      email: email
    }
  })

  return response.data;
}