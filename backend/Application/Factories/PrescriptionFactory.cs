using Domain.Dtos.Prescription;
using prontuario.Domain.Entities.PatientMedication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class PrescriptionFactory
    {
        public static PatientPrescriptionEntity CreatePrescription(CreatePrescriptionDTO data)
        {
            return new PatientPrescriptionEntityBuilder()
                .WithPrescriptionDate(data.PrescriptionDate)
                .WithExecutionDate(data.ExecutionDate)
                .WithDescription(data.Posology)
                .WithMedicalRecordId(data.MedicalRecordId)
                .WithProfessionalId(data.ProfessionalId)
                .WithType(data.Type)
                .WithMedicationName(data.MedicationName)
                .Build();
        }
    }
}
