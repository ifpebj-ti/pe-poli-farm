import { useQuery } from '@tanstack/react-query';

import { Patient } from '@/src/lib/pacientes';
import { PatientService } from '@/src/services/PatientService';

export function useHistoricoExames() {
  const { data: pacientes, ...rest } = useQuery<Patient[]>({
    queryKey: ['pacientesHistorico'], // Chave única para esta query
    queryFn: PatientService.getAll
  });

  return {
    pacientes,
    ...rest
  };
}
