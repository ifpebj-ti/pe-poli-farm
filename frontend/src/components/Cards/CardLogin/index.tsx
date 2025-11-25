'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiLock, FiMail } from 'react-icons/fi';
import { LuLoader } from 'react-icons/lu';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/src/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { PasswordInput } from '../../ui/passwordInput';
import { useCardLogin } from './hooks/useCardLogin';
import { mySchema, typeMyschema } from './schemas/schema';

export function CardLogin() {
  const { submitForm } = useCardLogin();
  const form = useForm<typeMyschema>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <Card
      className="
        flex flex-col justify-between 
        bg-[#BED6EF] 
        w-full max-w-[478px]
        p-6 sm:p-[30px]
        rounded-[20px] 
        border-gray-600
        mx-auto
        shadow-lg
      "
    >
      <CardHeader className="p-0">
        <CardTitle className="text-black text-2xl sm:text-3xl font-medium my-6 sm:my-10 text-center sm:text-left">
          Acesso ao Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col gap-5"
          >
            {/* Campo Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900 focus-within:ring-2 focus-within:ring-blue-600">
                      <Label htmlFor="email">
                        <FiMail className="text-xl text-black shrink-0" />
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black w-full bg-transparent"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                  <p className="text-[13px] text-black font-medium">
                    Insira seu endereço de e-mail
                  </p>
                </FormItem>
              )}
            />

            {/* Campo Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field: controlField, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-y-[10px]">
                      <div className="flex items-center gap-x-[10px] p-[10px] pr-0 border-[1px] bg-gray-200 rounded-sm border-gray-900 focus-within:ring-2 focus-within:ring-blue-600">
                        <Label htmlFor="password">
                          <FiLock className="text-xl text-black shrink-0" />
                        </Label>
                        <PasswordInput
                          id="password"
                          placeholder="Senha"
                          className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black w-full bg-transparent"
                          {...controlField}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <p className="text-[13px] text-black font-medium">
                          Insira sua senha
                        </p>

                        <div
                          className={`flex w-full sm:w-auto ${fieldState.invalid ? 'justify-between' : 'justify-end'}`}
                        >
                          <FormMessage className="mr-auto sm:mr-0" />
                          <Link
                            href="/recoverPassword"
                            className="text-[13px] text-black font-medium hover:text-white hover:underline whitespace-nowrap"
                          >
                            Esqueci minha senha
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="bg-blue-800 hover:bg-blue-700 transition-colors w-full h-12 text-lg rounded-full cursor-pointer mt-2"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <>
                  <LuLoader className="animate-spin mr-2" />
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
