using WebApi.ResponseModels.Anamnese;
using WebApi.ResponseModels.HealthAndDisease;
using WebApi.ResponseModels.PatientMedications;

namespace WebApi.ResponseModels.MedicalRecord;

public record MedicalRecordResponse(
    Guid Id,
    string? Status,
    string? StatusInCaseOfAdmission,
    AnamneseResponse? Anamnese,
    HealthAndDiseaseResponse? HealthAndDisease,
    List<PatientPrescriptionResponse>? PatientMedications
);