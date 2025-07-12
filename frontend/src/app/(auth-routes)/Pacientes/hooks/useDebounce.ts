// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

// T é um tipo genérico, o que torna o hook reutilizável para qualquer tipo de valor (string, number, etc.)
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para guardar o valor "atrasado"
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um temporizador que só vai atualizar o estado após o 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza: se o 'value' mudar antes do delay, o temporizador anterior é cancelado
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Roda o efeito novamente apenas se o valor ou o delay mudarem

  return debouncedValue;
}
