import { AppointmentData, CreateAppointment } from '../lib/appointment';
import { api } from './api';

export const getAllAppointments = async (): Promise<AppointmentData[]> => {
  try {
    const response = await api.get<AppointmentData[]>('/Appointment');

    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const getAppointments = async (
  date: Date
): Promise<AppointmentData[]> => {
  try {
    const response = await api.get<AppointmentData[]>('/Appointment', {
      params: {
        scheduledAt: date.toISOString()
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData: CreateAppointment) => {
  try {
    const response = await api.post('/Appointment', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};
