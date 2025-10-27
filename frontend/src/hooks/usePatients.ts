import { useQuery } from '@tanstack/react-query';

import { PatientService } from '@/src/services/PatientService';
import { Patient } from '@/src/lib/pacientes';

export function usePatients() {
  const { data, ...rest } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: PatientService.getAll
  });

  return {
    data: data,
    ...rest
  };
}
