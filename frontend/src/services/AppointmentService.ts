import { api } from './api';

export const getAppointments = async (date: Date) => {
  try {
    const response = await api.get('/Appointment', {
      params: {
        ScheduledAt: date.toISOString()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export interface AppointmentData {
  patientId: string;
  professionalId: string;
  specialty: string;
  scheduledAt: string;
  status: number;
}

export const createAppointment = async (appointmentData: AppointmentData) => {
  try {
    const response = await api.post('/Appointment', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};
