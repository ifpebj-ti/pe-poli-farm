import Image from 'next/image';

import { CardLogin } from '../components/Cards/CardLogin';

export default function Login() {
  return (
    <div className="min-h-screen bg-[url('/Login.png')] bg-no-repeat bg-cover bg-center flex justify-center items-center gap-x-36 h-full">
      <Image
        className="h-3/4"
        src="/DoctorLogin.svg"
        alt="imagem ilustrativa de doutor"
        width={400}
        height={400}
      />
      <CardLogin />
    </div>
  );
}
