'use client';

import React from 'react';
// import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { LuLoader } from 'react-icons/lu';

import { Input } from '../ui/input';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/src/components/ui/form';
import { Label } from '../ui/label';
// import { PasswordInput } from '@/src/components/ui/passwordInput';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { mySchema, typeMyschema } from './schemas/schema';
import { useCardLogin } from './hooks/useCardLogin'

export function CardLogin() {
  const { form, submitForm, JsonText } = useCardLogin();
  // const form = useForm<typeMyschema>({
  //   resolver: zodResolver(mySchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });

  return (
    <Card className="flex flex-col justify-between bg-[#BED6EF] w-[478px] p-[30px] rounded-[20px] absolute right-[150px] self-center border-gray-600">
      {/* <button className="w-fit text-xl">
        <FiArrowLeft />
      </button> */}
      <CardHeader className="p-0">
        <CardTitle className="text-black text-3xl font-medium my-10">
          {/* Acesso ao Sistema */}
          Busque um Usuário
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-[10px] p-[10px] border-[1px] bg-gray-200 rounded-sm border-gray-900">
                      <Label htmlFor="email">
                        <FiMail className="text-xl text-black" />
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-600' />
                  <p className="text-[13px] text-black font-medium">
                    Insira o endereço de e-mail do usuário que você deseja buscar
                  </p>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field: controlField, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-y-[10px]">
                      <div className="flex items-center gap-x-[10px] p-[10px] pr-0 border-[1px] bg-gray-200 rounded-sm border-gray-900">
                        <Label htmlFor="password">
                          <FiLock className="text-xl text-black" />
                        </Label>
                        <PasswordInput
                          id="password"
                          placeholder="Senha"
                          className="border-0 p-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-black"
                          {...controlField}
                        />
                      </div>
                      <p className="text-[13px] text-black font-medium">
                        Insira sua senha
                      </p>
                      <div
                        className={`flex w-full ${fieldState.invalid ? 'justify-between' : 'justify-center'}`}
                      >
                        <FormMessage />
                        <Link
                          href="/recoverPassword"
                          className="text-[13px] text-black font-medium hover:text-white hover:underline"
                        >
                          Esqueci minha senha
                        </Link>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <p className='text-black'>
              {JsonText}
            </p>
            <Button
              className="bg-blue-800 w-full text-lg rounded-4xl cursor-pointer"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <>
                  <LuLoader className="animate-spin" />
                  Carregando...
                </>
              )}
              {!form.formState.isSubmitting && 'Buscar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
