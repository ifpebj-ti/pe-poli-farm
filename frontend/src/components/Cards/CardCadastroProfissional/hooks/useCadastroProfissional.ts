import { useForm } from 'react-hook-form';

import { PostUser } from '@/src/services/UserService';
import { zodResolver } from '@hookform/resolvers/zod';

import { cadastroUserSchema, CadastroUserSchema } from '../schemas/schema';

// TODO: Importar uma biblioteca de notificações (toast), como 'react-hot-toast' ou 'sonner'
// import { toast } from 'react-hot-toast';

export function useCadastroProfissional() {
  const form = useForm<CadastroUserSchema>({
    // Conecta o nosso schema Zod com o React Hook Form
    resolver: zodResolver(cadastroUserSchema),
    // Define os valores iniciais do formulário
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      position: 'RECEPTION', // Usamos undefined para que o placeholder do Select funcione corretamente
      profile: {
        role: 'ADMIN'
      }
    }
  });

  /**
   * Função chamada quando o formulário é submetido com sucesso (após passar na validação).
   * @param data - Os dados validados do formulário.
   */
  async function handleCadastro(data: CadastroUserSchema) {
    try {
      console.log('Enviando para a API:', data);

      const response = await PostUser(data);

      console.log('Resposta da API:', response);
      // toast.success('Usuário cadastrado com sucesso!'); // Exemplo de notificação de sucesso

      form.reset(); // Limpa o formulário após o sucesso
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // toast.error('Houve um erro ao cadastrar o usuário. Tente novamente.'); // Exemplo de notificação de erro
    }
  }

  // O hook retorna o 'form' (que contém o controle, erros, etc.) e a função de submissão.
  return {
    form,
    handleCadastro
  };
}
