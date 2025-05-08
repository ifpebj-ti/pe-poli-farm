// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';

import { mySchema, typeMyschema } from '../schemas/schema';
import { useState } from 'react';
import { FindUserByEmail } from '@/src/services/UserService';

export function useCardLogin() {
  // const session = useSession();
  const [JsonText, setJsonText] = useState('');
  // const { push } = useRouter();
  const form = useForm<typeMyschema>({
    resolver: zodResolver(mySchema)
  });

  const submitForm: SubmitHandler<typeMyschema> = async (data) => {
    // const response = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false
    // });

    const response = await FindUserByEmail(data.email);
    console.log('response', response);
    
    // if (response?.status === 200) {
    if (response) {
      // toast.success('Login efetuado com sucesso');
      toast.success('Usuário encontrado com sucesso!');
      setJsonText(JSON.stringify(response, null, 2));
      // if (session.data?.user?.firstAccess === 'False') {
      //   push('/novaSenha');
      // } else if (
      //   session.data?.user.role === 'ADMIN' ||
      //   session.data?.user.role === 'RECEPTIONTEAM'
      // ) {
      //   push('/atendimentos');
      // } else if (session.data?.user.role === 'DOCTOR') {
      //   push('/atendimetoMedico');
      // } else if (session.data?.user.role === 'NURSE') {
      //   push('/enfermagem');
      // } else {
      //   push('/equipeMultiprofissional');
      // }
      // push('/out')
    } else {
      // toast.error('Usuário ou senha inválidos');
      toast.error('Usuário não encontrado');

    }
  };

  return {
    form,
    submitForm,
    JsonText
  };
}