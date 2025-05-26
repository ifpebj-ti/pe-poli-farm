import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// import { PutUser } from '@/services/UserService';
import { zodResolver } from '@hookform/resolvers/zod';

import { mySchema, typeMyschema } from '../schemas/schema';
import { PutUser } from '@/src/services/UserService';

export function useCardNovaSenha() {
  const session = useSession();
  const { push } = useRouter();
  const form = useForm<typeMyschema>({
    resolver: zodResolver(mySchema)
  });

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    const dataForBack = {
      email: data.email,
      accessCode: data.accessCode,
      password: data.password
    };

    const result = await PutUser(dataForBack);

    if (result.status === 200) {
      toast.success('Senha alterada com sucesso');
      if (
        session.data?.user.role === 'ADMIN' ||
        session.data?.user.role === 'RECEPTIONTEAM'
      ) {
        push('/atendimentos');
      } else if (session.data?.user.role === 'DOCTOR') {
        push('/atendimetoMedico');
      } else if (session.data?.user.role === 'NURSE') {
        push('/enfermagem');
      } else {
        push('/equipeMultiprofissional');
      }
    } else {
      toast.error('Erro ao alterar a senha');
    }
  };

  return {
    form,
    submitForm
  };
}