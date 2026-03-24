import { useState, useEffect, useCallback } from 'react';

import {
  getAllAppointments,
  getAppointments
} from '@/src/services/AppointmentService';

import { AppointmentData } from '../lib/appointment';

export const useAppointments = (currentDate?: Date, filter?: string) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = currentDate
        ? await getAppointments(currentDate)
        : await getAllAppointments();

      const parsed = data.map((item) => ({
        ...item,
        scheduledAt: new Date(item.scheduledAt)
      }));

      setAppointments(parsed);
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
