export const noMask = (value: string) => value.replace(/\D/g, '');
export const noMaskRG = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '');

export function normalizeTelephone(value: string) {
  return noMask(value)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(
      noMask(value).length >= 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/,
      '$1-$2'
    );
}

export function normalizeCPF(value: string) {
  return noMask(value)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2');
}

export function normalizeRG(value: string) {
  if (noMaskRG(value).length <= 9) {
    // Aplica o formato para RG com números e pontos: XX.XXX.XXX
    return noMaskRG(value)
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\w{1})/, '$1-$2');
  } else {
    // Caso o RG tenha mais de 9 caracteres, o último pode ser letra ou número
    return noMaskRG(value)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\w{1})/, '$1-$2');
  }
}
