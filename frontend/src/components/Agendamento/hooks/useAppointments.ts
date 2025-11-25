import { useState, useEffect, useCallback } from 'react';

import { getAppointments } from '@/src/services/AppointmentService';

export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export const useAppointments = (currentDate: Date, filter: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAppointments(currentDate);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedAppointments = data.map((item: any) => ({
        id: item.id,
        title: item.reason,
        start: new Date(item.scheduledAt),
        end: new Date(item.scheduledAt)
      }));
      setAppointments(formattedAppointments);
    } catch (err) {
      setError('Failed to fetch appointments.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, filter]);

  return { appointments, isLoading, error, refetch: fetchAppointments };
};
