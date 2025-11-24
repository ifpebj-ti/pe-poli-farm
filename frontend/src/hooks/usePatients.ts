import { Patient } from '@/src/lib/pacientes';
import { PatientService } from '@/src/services/PatientService';
import { useQuery } from '@tanstack/react-query';

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
