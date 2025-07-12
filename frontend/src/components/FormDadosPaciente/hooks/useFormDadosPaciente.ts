// /components/FormDadosPaciente/useFormDadosPaciente.js
import { useState } from 'react';

import { api } from '@/src/services/api';
import axios from 'axios';

import {
  initialState,
  PatientFormData,
  patientSchema
} from '../schemas/schema';

type FormErrors = { [key: string]: string | undefined };

export const useFormDadosPaciente = () => {
  const [patientData, setPatientData] = useState<PatientFormData>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<FormErrors>({});

  // Todos os handlers agora recebem eventos tipados
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleEmergencyContactChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedContacts = patientData.emergencyContactDetails.map(
      (contact, i) => (i === index ? { ...contact, [name]: value } : contact)
    );
    setPatientData((prev) => ({
      ...prev,
      emergencyContactDetails: updatedContacts
    }));
  };

  // Funções de adicionar/remover não mudam muito, mas o estado que manipulam é tipado
  const addEmergencyContact = () => {
    setPatientData((prev) => ({
      ...prev,
      emergencyContactDetails: [
        ...prev.emergencyContactDetails,
        { name: '', phone: '', relationship: '' }
      ]
    }));
  };

  const removeEmergencyContact = (index: number) => {
    if (patientData.emergencyContactDetails.length > 1) {
      setPatientData((prev) => ({
        ...prev,
        emergencyContactDetails: prev.emergencyContactDetails.filter(
          (_, i) => i !== index
        )
      }));
    }
  };

  const handleSubmit = async () => {
    // 1. Validar os dados com Zod
    const result = patientSchema.safeParse(patientData);

    // 2. Se a validação falhar, atualiza o estado de erros
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join('.'); // ex: "address.cep" ou "emergencyContactDetails.0.name"
        fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      console.log('Erros de validação:', fieldErrors);
      return;
    }

    // 3. Se a validação passar, limpa os erros e envia os dados (agora seguros)
    setErrors({});
    const validatedData = result.data; // Dados validados e tipados

    const payload = {
      ...validatedData,
      birthDate: new Date(validatedData.birthDate).toISOString(),
      address: {
        ...validatedData.address,
        number: parseInt(validatedData.address.number, 10) || 0
      }
    };

    console.log('Enviando payload validado:', payload);

    try {
      // Apenas a chamada simples é necessária
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post('/Patient', payload);

      // O código só chega aqui se o status for 2xx (200, 201, etc.)
      alert('Paciente salvo com sucesso!');
      setPatientData(initialState);
    } catch (error) {
      // O Axios coloca o erro em 'error.response'
      if (axios.isAxiosError(error) && error.response) {
        // Erro vindo da resposta do servidor (4xx, 5xx)
        const errorData = error.response.data;
        console.error('Erro do servidor:', error.response);
        alert(
          `Erro ao salvar: ${errorData.message || `Status ${error.response.status}`}`
        );
      } else {
        // Erro de rede ou outro problema
        console.error('Erro de rede ou configuração:', error);
        alert('Erro de conexão. Verifique sua rede ou a configuração da API.');
      }
    }
  };

  // Retorna tudo o que o componente de UI precisa
  return {
    patientData,
    handleChange,
    handleAddressChange,
    handleEmergencyContactChange,
    addEmergencyContact,
    removeEmergencyContact,
    handleSubmit
  };
};
