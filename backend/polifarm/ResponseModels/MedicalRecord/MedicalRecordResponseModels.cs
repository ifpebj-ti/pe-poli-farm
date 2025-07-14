using Domain.Entities.MedicalRecord;
using WebApi.ResponseModels.HealthAndDisease;
using WebApi.ResponseModels.PatientMedications;
using WebApi.ResponseModels.Anamnese;
using WebApi.ResponseModels.MedicalRecord;
using WebApi.ResponseModels.PatientExams;

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
            .WithPatientExams(medicalRecordEntity.PatientExams?.Select(exam =>
                           PatientExamResponseModels.CreatePatientExamResponse(exam)).ToList())
            .Build();

        return medicalRecordResponse;
    }

    public static List<MedicalRecordResponse> CreateCompleteMedicalRecordResponseList(List<MedicalRecordEntity> medicalRecordEntity)
    {
        return medicalRecordEntity.Select(medicalRecord =>
                   CreateCompleteMedicalRecordResponse(medicalRecord)).ToList();
    }

}
