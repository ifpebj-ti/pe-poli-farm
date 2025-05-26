// components/CardLogin/hooks/useCardLogin.ts
import { useRouter } from 'next/navigation'; // Para redirecionamento
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify'; // Para notificações
import { typeMyschema } from '../schemas/mySchema'; // Importa o tipo do schema
import { jwtDecode } from 'jwt-decode';

// Defina a URL base da sua API, pode vir de uma variável de ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5226'; // Exemplo, ajuste para sua API .NET

interface DecodedToken {
  firstAccess?: string; // Marcar como opcional para segurança, caso o token não tenha
  role?: string;
  email?: string;
  userId?: string;
  position?: string;
  // Adicione outros campos que você possa precisar do token
}

export function useCardLogin() {
  const router = useRouter();

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Auth/Login`, { // << CONFIRME SE ESTE ENDPOINT ESTÁ CORRETO
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      console.log('Status da Resposta da API:', response.status, response.statusText);

      if (response.ok) {
        const responseData = await response.json(); // Ex: { token: "eyJ..." }
        console.log('Resposta da API (Login bem-sucedido):', responseData);

        if (responseData && responseData.token) {
          const token = responseData.token as string;

          // 1. Armazenar o token (Exemplo: localStorage)
          // Para aplicações reais, considere alternativas mais seguras como cookies HttpOnly se possível,
          // ou gerenciar o estado da sessão de forma mais robusta.
          try {
            localStorage.setItem('authToken', token);
            console.log('Token armazenado no localStorage.');
          } catch (e) {
            console.error('Erro ao armazenar o token no localStorage:', e);
            toast.error('Não foi possível manter sua sessão. Por favor, tente novamente.');
            return; // Não continuar se não puder armazenar o token
          }
          
          // 2. Decodificar o token para ler as 'claims'
          let decodedToken: DecodedToken | null = null;
          try {
            decodedToken = jwtDecode<DecodedToken>(token);
            console.log('Token Decodificado:', decodedToken);
          } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            toast.error('Token inválido recebido do servidor.');
            localStorage.removeItem('authToken'); // Limpar token se for inválido
            return; // Não prosseguir se o token for inválido
          }

          toast.success('Login efetuado com sucesso!');

          // 3. Lógica de redirecionamento baseada em 'firstAccess'
          // Importante: O valor de 'firstAccess' no seu JWT é uma STRING ("True" ou "False")
          if (decodedToken && decodedToken.firstAccess === "True") {
            console.log('Redirecionando para /NovoAcesso');
            router.push('/NovoAcesso');
          } else if (decodedToken && decodedToken.firstAccess === "False") {
            console.log('Redirecionando para /Inicio');
            router.push('/Inicio');
          } else {
            // Fallback: se firstAccess não estiver presente ou tiver um valor inesperado
            console.warn("Claim 'firstAccess' não encontrada ou com valor inesperado no token. Redirecionando para /Inicio por padrão.");
            router.push('/Inicio');
          }

        } else {
          toast.error('Resposta de login inválida: token não encontrado.');
          console.error('Token não encontrado na resposta da API:', responseData);
        }

      } else {
        const errorData = await response.json().catch(() => ({ message: 'Não foi possível ler o corpo do erro.' }));
        console.error('Erro da API (Login falhou):', errorData);
        const errorMessage = errorData?.message || errorData?.title || `Erro: ${response.status} - ${response.statusText}`;
        if (response.status === 400 && errorData?.errors) {
          const validationErrors = Object.values(errorData.errors).flat().join('\n');
          toast.error(`Falha no login: ${validationErrors}`);
        } else {
          toast.error(`Falha no login: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Erro de rede ou exceção no fetch:', error);
      toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return {
    submitForm,
  };
}