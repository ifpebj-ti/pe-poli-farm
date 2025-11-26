import { useState } from 'react';

import {
  createAppointment,
  AppointmentData
} from '@/src/services/AppointmentService';

export const useCreateAppointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewAppointment = async (appointmentData: AppointmentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createAppointment(appointmentData);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError('Failed to create appointment.');
      setIsLoading(false);
      throw err;
    }
  };

  return { createNewAppointment, isLoading, error };
};
