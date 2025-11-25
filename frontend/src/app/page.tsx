import { CardLogin } from '../components/Cards/CardLogin';

export default function Login() {
  return (
    <div
      className="
        min-h-screen 
        flex h-full items-center 
        
        /* --- ALINHAMENTO --- */
        justify-center        /* Mobile: Centraliza no meio da tela */
        
        md:justify-end        /* Desktop: Joga para o FINAL (Direita) */
        md:pr-10 lg:pr-20     /* Desktop: Dá um espaço da borda direita para não ficar colado */

        /* --- ESTILO MOBILE --- */
        bg-sky-200            /* Cor de fundo */
        bg-none               /* Sem imagem */

        /* --- ESTILO DESKTOP (Imagem) --- */
        md:bg-[url('/Login.jpg')] 
        md:bg-no-repeat 
        md:bg-cover           /* Cobre a tela toda */
        md:bg-center          /* Centraliza a imagem no fundo */
      "
    >
      {/* Wrapper para garantir que o card não estique ou fique pequeno demais */}
      <div className="w-full max-w-[478px]">
        <CardLogin />
      </div>
    </div>
  );
}
