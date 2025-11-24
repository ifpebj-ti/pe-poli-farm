import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// import { PutUser } from '@/services/UserService';
import { NewPassword } from '@/src/services/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import { mySchema, typeMyschema } from '../schemas/schema';

export function useCardNovaSenha() {
  const router = useRouter();

  // Inicializa o react-hook-form com o schema de validação
  const form = useForm<typeMyschema>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      email: '', // Garante que o email comece como string vazia
      accessCode: '', // Garante que o accessCode comece como string vazia
      password: '', // Garante que a senha comece como string vazia
      repeatPassword: '' // Garante que a repetição da senha comece como string vazia
    }
  });

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    try {
      // Chama a função de serviço para mudar a senha
      const response = await NewPassword(
        data.email,
        data.password,
        data.accessCode
      );

      if (response.status === 200) {
        toast.success(
          'Senha alterada com sucesso! Você pode fazer login agora.'
        );
        console.log('Resposta da nova senha:', response.data);

        // Redireciona para a página de login
        router.push('/'); // Ou '/signin', dependendo da sua rota de login
      } else {
        // Se a API retornar 200 OK, mas com um corpo que indica erro lógico (sem token, por exemplo)
        const errorData = response.data;
        const errorMessage =
          errorData?.message ||
          errorData?.title ||
          `Erro ao alterar senha. Resposta inesperada.`;
        toast.error(`Falha ao alterar senha: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao tentar alterar a senha:', error);

      if (error instanceof AxiosError) {
        if (error.response) {
          const apiError = error.response.data;
          const statusCode = error.response.status;

          console.error('Resposta de erro da API (data):', apiError);
          console.error('Status Code da API:', statusCode);
          console.error('Headers da resposta da API:', error.response.headers);

          let errorMessage = 'Falha ao alterar a senha.';

          if (statusCode === 400 && apiError?.errors) {
            // Erros de validação específicos do ASP.NET Core
            const validationErrors = Object.values(apiError.errors)
              .flat()
              .join('\n');
            errorMessage = `Falha ao alterar senha: ${validationErrors}`;
          } else if (statusCode === 400) {
            // Outros erros 400 (ex: código de acesso inválido)
            errorMessage =
              apiError?.message ||
              apiError?.title ||
              'Código de acesso inválido ou expirado.';
          } else if (statusCode === 401) {
            // Se a API retornar 401 para código inválido/não autorizado
            errorMessage = 'Não autorizado. Verifique seu código de acesso.';
          } else if (apiError?.message || apiError?.title) {
            errorMessage = `Falha ao alterar senha: ${apiError.message || apiError.title}`;
          } else {
            errorMessage = `Falha ao alterar senha: Erro ${statusCode}.`;
          }
          toast.error(errorMessage);
        } else if (error.request) {
          toast.error(
            'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.'
          );
        } else {
          toast.error(
            'Erro interno ao tentar alterar a senha. Tente novamente mais tarde.'
          );
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        console.error('Erro inesperado:', error);
      }
    }
  };

  return {
    form,
    submitForm
  };
}
