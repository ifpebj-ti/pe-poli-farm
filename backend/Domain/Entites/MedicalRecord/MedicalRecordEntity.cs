using Domain.Entites;
using Domain.Entities.Anamnese;
using Domain.Entities.HealthAndDisease;
using Domain.Entities.PatientExams;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using prontuario.Domain.Entities.PatientMedication;
using System.Text.Json.Serialization;

namespace Domain.Entities.MedicalRecord;

public class MedicalRecordEntity : BaseEntity
{
    public MedicalRecordStatus Status { get; set; } = null!;
    public MedicalRecordStatus StatusInCaseOfAdmission { get; private set; }
    public AnamneseEntity? Anamnese { get; set; }
    public ICollection<PatientExamsEntity> PatientExams { get; set; } = new List<PatientExamsEntity>();
    public ICollection<PatientPrescriptionEntity> PatientMedications { get; set; } = new List<PatientPrescriptionEntity>();
    public HealthAndDiseaseEntity HealthAndDisease { get; private set; } = null!;
    public Guid ServiceId { get; private set; }
    [JsonIgnore]
    public ServiceEntity Service { get; private set; } = null!;

    public MedicalRecordEntity() { }

    public MedicalRecordEntity(Guid id, MedicalRecordStatus status, MedicalRecordStatus statusInCaseOfAdmission, AnamneseEntity? anamnese)
    {
        this.Id = id;
        this.Status = status;
        this.StatusInCaseOfAdmission = statusInCaseOfAdmission;
        this.Anamnese = anamnese;
    }

    public MedicalRecordEntity(Guid id, MedicalRecordStatus status, MedicalRecordStatus statusInCaseOfAdmission, AnamneseEntity? anamnese, Guid serviceId)
    {
        this.Id = id;
        this.Status = status;
        this.StatusInCaseOfAdmission = statusInCaseOfAdmission;
        this.Anamnese = anamnese;
        this.ServiceId = serviceId;
    }

    public void SetHealthAndDisease(HealthAndDiseaseEntity healthAndDisease)
    {
        HealthAndDisease = healthAndDisease;
    }
}