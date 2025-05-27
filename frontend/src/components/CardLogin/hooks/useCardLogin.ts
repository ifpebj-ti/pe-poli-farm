// components/CardLogin/hooks/useCardLogin.ts
import { useRouter } from 'next/navigation'; // Para redirecionamento
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify'; // Para notificações
import { typeMyschema } from '../schemas/mySchema'; // Importa o tipo do schema
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from '@/src/lib/jwtUtils';


// Defina a URL base da sua API, pode vir de uma variável de ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5226'; // Exemplo, ajuste para sua API .NET

export function useCardLogin() {
  const router = useRouter();

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Auth`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        // Login bem-sucedido
        const responseData = await response.json(); // Supondo que a API retorna dados, como um token
        toast.success('Login efetuado com sucesso!');
        console.log('Dados de resposta do login:', responseData);

        localStorage.setItem('UserAuth', responseData.token); // Armazena o email do usuário, se necessário

        const tokenRaw: MyJwtPayload = jwtDecode(responseData.token);

        const firstAccess = tokenRaw.firstAccess // Supondo que o token contém essa informação
        
        if (tokenRaw && firstAccess == "False") {
          router.push('/NovoAcesso')
        } else () => {
          router.push('/Inicio'); // Redireciona para a página principal ou dashboard
        }
      } else {
        // Tratar erros de login (ex: credenciais inválidas, usuário não encontrado)
        const errorData = await response.json().catch(() => null); // Tenta pegar corpo do erro
        const errorMessage = errorData?.message || errorData?.title || `Erro: ${response.status} - ${response.statusText}`;
        if (response.status === 400 && errorData?.errors) {
          // Se a API retorna erros de validação específicos do ASP.NET Core
          const validationErrors = Object.values(errorData.errors).flat().join('\n');
          toast.error(`Falha no login: ${validationErrors}`);
        } else {
          toast.error(`Falha no login: ${errorMessage}`);
        }
      }
    } catch (error) {
      // Tratar erros de rede ou outros erros inesperados
      console.error('Erro ao tentar fazer login:', error);
      toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return {
    submitForm,
  };
}