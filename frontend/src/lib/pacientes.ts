// src/data/mockPacientes.ts

// -> TIPO DEFINIDO AQUI <-
// Este é o "contrato" que todo objeto de paciente deve seguir.
// src/types/paciente.ts

// Tipos aninhados baseados na sua API
export interface PatientFormData {
  name: string;
  socialName: string;
  birthDate: string;
  sus: string;
  cpf: string;
  rg: string;
  phone: string;
  motherName: string;
  address: Address;
  emergencyContactDetails: EmergencyContactDetail[];
}

export type Address = {
  cep: string;
  city: string;
  street: string;
  number: number;
  neighborhood: string;
};

export type EmergencyContactDetail = {
  name: string;
  phone: string;
  relationship: string;
};

export type Anamnese = {
  id: string;
  bloodPressure: string;
  glucose: string;
  temperature: string;
  respiratoryRate: string;
  bloodType: string;
  weight: string;
  heartRate: string;
  saturation: string;
  height: string;
  antecPathological: boolean;
  necesPsicobio: boolean;
  diabetes: boolean;
  medicationsInUse: boolean;
  useOfProthesis: boolean;
  allergies: boolean;
  allergiesType: string;
  antecPathologicalType: string;
  medicationInUseType: string;
  medicalHypothesis: string;
  previousSurgeries: string;
  signsAndSymptoms: string;
  classificationStatus: string;
};

export type HealthAndDisease = {
  id: string;
  familyHAS: boolean;
  familyDM: boolean;
  familyIAM: boolean;
  familyAVC: boolean;
  familyAlzheimer: boolean;
  familyCA: boolean;
  ownHAS: boolean;
  ownDM: boolean;
  ownIAM: boolean;
  ownAVC: boolean;
  ownAlzheimer: boolean;
  ownCA: boolean;
  medicalRecordId: string;
};

export type PatientMedication = {
  id: string;
  prescriptionDate: string; // Datas como string são comuns, podem ser convertidas para Date se necessário.
  executionDate: string;
  posology: string;
  type: string;
  name: string;
};

export type MedicalRecord = {
  id: string;
  status: string;
  statusInCaseOfAdmission: string;
  anamnese: Anamnese;
  healthAndDisease: HealthAndDisease;
  patientMedications: PatientMedication[];
};

export type Service = {
  id: string;
  serviceDate: string;
  serviceStatus: string;
  medicalRecord: MedicalRecord;
};

// Este é o tipo principal para um único paciente
export type Patient = {
  id: string;
  name: string;
  socialName: string;
  birthDate: string;
  sus: string;
  cpf: string;
  rg: string;
  phone: string;
  motherName: string;
  status: string;
  address: Address;
  emergencyContactDetails: EmergencyContactDetail[];
  services: Service[];
};

// Este é o tipo para a resposta completa da API de filtro
export type PatientApiResponse = {
  data: Patient[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
};

export const mockPacientes = [
  {
    id: 1,
    nome: 'Ana Silva',
    cpf: '111.222.333-44',
    dataCadastro: '2025-06-20',
    nomeMae: 'Maria Silva',
    idade: '28',
    entrada: '2025-06-20T08:00:00'
  },
  {
    id: 2,
    nome: 'Bruno Costa',
    cpf: '222.333.444-55',
    dataCadastro: '2025-06-18',
    nomeMae: 'Lucia Costa',
    idade: '34',
    entrada: '2025-06-18T09:30:00'
  },
  {
    id: 3,
    nome: 'Carlos de Andrade',
    cpf: '333.444.555-66',
    dataCadastro: '2025-06-15',
    nomeMae: 'Patricia Andrade',
    idade: '41',
    entrada: '2025-06-15T10:15:00'
  },
  {
    id: 4,
    nome: 'Daniela Martins',
    cpf: '444.555.666-77',
    dataCadastro: '2025-06-12',
    nomeMae: 'Fernanda Martins',
    idade: '22',
    entrada: '2025-06-12T11:45:00'
  },
  {
    id: 5,
    nome: 'Eduardo anjos',
    cpf: '555.666.777-88',
    dataCadastro: '2025-06-10',
    nomeMae: 'Sonia Anjos',
    idade: '30',
    entrada: '2025-06-10T13:00:00'
  }
];
