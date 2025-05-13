'use client';

import { useRouter } from 'next/navigation';
import { FiMail, FiLock } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import { LuLoader } from 'react-icons/lu';

import { Input } from '../ui/input';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '../ui/form';
import { PasswordInput } from '../ui/passwordInput';
import { useCardNovaSenha } from './hooks/useCardNovaSenha';

export default function CardNovoAcesso() {
  const router = useRouter();
  const { form, submitForm } = useCardNovaSenha();

  return (
    <Card className="flex flex-col justify-between bg-[#BED6EF] w-[478px] p-[30px] rounded-[20px] absolute right-[150px] self-center border-gray-600">
        <button className="w-fit text-xl">
          <FiArrowLeft color='black'/>
        </button>
        <CardHeader className="p-0">
          <CardTitle className="text-black text-3xl font-medium my-10">
            Acesso ao Sistema
          </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900">
                      <FiMail className="text-xl text-black" />
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-black'>
                    Digite seu endereço de e-mail
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accessCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900">
                      <FiLock className="h-5 w-5 mx-2 my-auto" color='black'/>
                      <Input
                        type="text"
                        placeholder="Código de Acesso"
                        {...field}
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-black'>
                    Digite seu código de acesso
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900">
                      <FiLock className="h-5 w-5 mx-2 my-auto" color='black' />
                      <PasswordInput
                        type="password"
                        placeholder="Senha"
                        {...field}
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-black'>
                    Digite sua senha
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900">
                      <FiLock className="h-5 w-5 mx-2 my-auto" color='black'/>
                      <PasswordInput
                        type="password"
                        placeholder="Repetir a Senha"
                        {...field}
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-black'>
                    Repita sua senha
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              className="bg-blue-800 w-full text-lg rounded-4xl cursor-pointer h-10"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <>
                  <LuLoader className="animate-spin" />
                  Carregando...
                </>
              )}
              {!form.formState.isSubmitting && 'Entrar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}