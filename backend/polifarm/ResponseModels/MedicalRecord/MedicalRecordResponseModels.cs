using Domain.Entities.MedicalRecord;
using WebApi.ResponseModels.HealthAndDisease;
using WebApi.ResponseModels.PatientMedications;
using WebApi.ResponseModels.Anamnese;
using WebApi.ResponseModels.MedicalRecord;

namespace WebApi.ResponseModels.MedicalRecord;

public class MedicalRecordResponseModels
{
    public static MedicalRecordResponse CreateCompleteMedicalRecordResponse(MedicalRecordEntity medicalRecordEntity)
    {
        var patientMedicationsResponse = medicalRecordEntity.PatientMedications?.Select(medication =>
            PatientPrescriptionResponseModels.CreatePatientExamsResponse(medication)
        ).ToList();

        var healthAndDiseaseResponse = medicalRecordEntity.HealthAndDisease == null
            ? null
            : HealthAndDiseaseResponseModels.CreateHealthAndDiseaseResponse(medicalRecordEntity.HealthAndDisease);

        var medicalRecordResponse = new MedicalRecordResponseBuilder()
            .WithId(medicalRecordEntity.Id)
            .WithStatus(medicalRecordEntity.Status.Value)
            .WithStatusInCaseOfAdmission(medicalRecordEntity.StatusInCaseOfAdmission.Value)
            .WithAnamnese(medicalRecordEntity.Anamnese == null ? null : AnamneseResponseModels.CreateCompleteAnamneseReponse(medicalRecordEntity.Anamnese!))
            .WithHealthAndDisease(healthAndDiseaseResponse)
            .WithPatientMedications(patientMedicationsResponse)
            .Build();

        return medicalRecordResponse;
    }
}
