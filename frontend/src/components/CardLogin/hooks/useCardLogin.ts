// components/CardLogin/hooks/useCardLogin.ts
import { useRouter } from 'next/navigation'; // Para redirecionamento
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify'; // Para notificações
import { typeMyschema } from '../schemas/mySchema'; // Importa o tipo do schema
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from '@/src/lib/jwtUtils';
import { Login } from '@/src/services/AuthService';
import { AxiosError } from 'axios';


// Defina a URL base da sua API, pode vir de uma variável de ambiente
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5226'; // Exemplo, ajuste para sua API .NET

export function useCardLogin() {
  const router = useRouter();

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    try {
      const response = await Login(data.email, data.password); 

      // AGORA: Verificamos se a resposta de dados contém a propriedade 'token'
      // Se houver um token, consideramos o login bem-sucedido.
      if (response.data && response.data.token) { // <--- MUDANÇA AQUI
        // Login bem-sucedido
        const responseData = response.data; 

        toast.success('Login efetuado com sucesso!');
        console.log('Dados de resposta do login:', responseData);

        localStorage.setItem('UserAuth', responseData.token); 

        const tokenRaw: MyJwtPayload = jwtDecode(responseData.token);

        const firstAccess = tokenRaw.firstAccess;
        
        if (tokenRaw && firstAccess === "False") { 
          router.push('/NovoAcesso');
        } else {
          router.push('/Inicio');
        }
      } else {
        // Este bloco será executado se a API retornar um status 2xx,
        // mas sem o token, o que indicaria um erro lógico no corpo da resposta
        // ou uma resposta inesperada.
        const errorData = response.data; 
        // Tentamos pegar uma mensagem de erro mais específica, ou a genérica
        const errorMessage = errorData?.message || errorData?.title || `Erro na resposta: Token não encontrado.`;
        
        // Aqui, a verificação de status 400 + errors talvez não seja mais relevante
        // se a API só retorna 200 OK com erros via o 'catch' principal.
        // Se sua API NUNCA retorna 200 OK sem token em caso de erro,
        // este `else` pode ser simplificado ou até removido.
        if (response.status === 400 && errorData?.errors) {
          const validationErrors = Object.values(errorData.errors).flat().join('\n');
          toast.error(`Falha no login: ${validationErrors}`);
        } else {
          toast.error(`Falha no login: ${errorMessage}`);
        }
      }
    } catch (error) { 
      console.error('Erro ao tentar fazer login:', error);

      if (error instanceof AxiosError) {
        if (error.response) {
          const apiError = error.response.data;
          const statusCode = error.response.status;

          let errorMessage = 'Falha no login.';

          if (statusCode === 401) {
            errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
          } else if (statusCode === 400 && apiError?.errors) {
            const validationErrors = Object.values(apiError.errors).flat().join('\n');
            errorMessage = `Falha no login: ${validationErrors}`;
          } else if (apiError?.message || apiError?.title) {
            errorMessage = `Falha no login: ${apiError.message || apiError.title}`;
          } else {
            errorMessage = `Falha no login: Erro ${statusCode}.`; // Adicionei ponto final para consistência
          }
          toast.error(errorMessage);
        } else if (error.request) {
          toast.error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        } else {
          toast.error('Erro interno. Tente novamente mais tarde.');
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        console.error('Erro inesperado:', error);
      }
    }
  };

  return {
    submitForm,
  };
}