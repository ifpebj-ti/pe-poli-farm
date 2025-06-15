using prontuario.Domain.Entities.PatientMedication;
using WebApi.ResponseModels.PatientMedications;

namespace WebApi.ResponseModels.PatientMedications
{
    public class PatientPrescriptionResponseModels
    {
        public static PatientPrescriptionResponse CreatePatientExamsResponse(PatientPrescriptionEntity patientMedicationEntity)
        {
            return new PatientPrescriptionResponseBuilder()
                .WithId(patientMedicationEntity.Id)
                .WithPrescriptionDate(patientMedicationEntity.PrescriptionDate)
                .WithExecutionDate(patientMedicationEntity.ExecutionDate)
                .WithDescription(patientMedicationEntity.Posology)
                .WithType(patientMedicationEntity.Type)
                .WithName(patientMedicationEntity.MedicationName)
                .Build();
        }
    }
}
