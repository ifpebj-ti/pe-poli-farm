using WebApi.ResponseModels.Anamnese;
using WebApi.ResponseModels.HealthAndDisease;
using WebApi.ResponseModels.MedicalRecord;
using WebApi.ResponseModels.PatientMedications;

namespace WebApi.ResponseModels.MedicalRecord;

public class MedicalRecordResponseBuilder
{
    private Guid _id;
    private string? _status;
    private string? _statusInCaseOfAdmission;
    private AnamneseResponse? _anamnese;
    private HealthAndDiseaseResponse? _healthAndDisease;
    private List<PatientMedicationResponse>? _patientMedications;

    public MedicalRecordResponseBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public MedicalRecordResponseBuilder WithStatus(string? status)
    {
        _status = status;
        return this;
    }

    public MedicalRecordResponseBuilder WithStatusInCaseOfAdmission(string? statusInCaseOfAdmission)
    {
        _statusInCaseOfAdmission = statusInCaseOfAdmission;
        return this;
    }

    public MedicalRecordResponseBuilder WithAnamnese(AnamneseResponse? anamnese)
    {
        _anamnese = anamnese;
        return this;
    }

    public MedicalRecordResponseBuilder WithHealthAndDisease(HealthAndDiseaseResponse? healthAndDisease)
    {
        _healthAndDisease = healthAndDisease;
        return this;
    }

    public MedicalRecordResponseBuilder WithPatientMedications(List<PatientMedicationResponse>? patientMedications)
    {
        _patientMedications = patientMedications;
        return this;
    }

    public MedicalRecordResponse Build()
    {
        return new MedicalRecordResponse(
            _id,
            _status,
            _statusInCaseOfAdmission,
            _anamnese,
            _healthAndDisease,
            _patientMedications
        );
    }
}