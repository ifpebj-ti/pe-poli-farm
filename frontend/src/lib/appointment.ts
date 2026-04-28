import { Patient } from './pacientes';
import { UserEntity } from './user';

export enum AppointmentStatusEnum {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Canceled = 'Canceled',
  Completed = 'Completed'
}

export const appointmentStatusLabels: Record<AppointmentStatusEnum, string> = {
  [AppointmentStatusEnum.Pending]: 'Pendente',
  [AppointmentStatusEnum.Confirmed]: 'Confirmado',
  [AppointmentStatusEnum.Canceled]: 'Suspenso',
  [AppointmentStatusEnum.Completed]: 'Finalizado'
};

export type AppointmentData = {
  id: string;
  patientName: string;
  professionalName: string;

  specialty: string;
  scheduledAt: Date;
  status: string;
};

export type AppointmentEntity = {
  patientId: string;
  patient: Patient;

  professionalId?: string;
  professional?: UserEntity;

  specialty: string;
  scheduledAt: Date;
  status: AppointmentStatusEnum;
};

export interface CreateAppointment {
  patientId: string;
  professionalId: string;
  specialty: string;
  scheduledAt: string;
  status: number;
}
