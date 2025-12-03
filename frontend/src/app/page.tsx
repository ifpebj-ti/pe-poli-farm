import Image from 'next/image';

import { CardLogin } from '../components/Cards/CardLogin';

export default function Login() {
  return (
    <main className="min-h-screen bg-[url('/Login.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div
        className="
          flex w-full max-w-5xl
          flex-col md:flex-row          /* empilha no mobile, lado a lado no desktop */
          items-center justify-center
          gap-8
          px-4
        "
      >
        {/* ILUSTRAÇÃO – some no mobile, aparece só em md+ */}
        <div className="hidden md:flex flex-1 justify-center">
          <Image
            src="/DoctorLogin.svg"
            alt="imagem ilustrativa de doutor"
            width={400}
            height={400}
            className="h-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
            priority
          />
        </div>

        {/* CARD DE LOGIN (sem alterar o componente) */}
        <div className="flex-1 flex justify-center w-full">
          <CardLogin />
        </div>
      </div>
    </main>
  );
}
