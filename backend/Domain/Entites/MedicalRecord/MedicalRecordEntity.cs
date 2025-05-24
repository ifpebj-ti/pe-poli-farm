using Domain.Entites;
using Domain.Entities.Anamnese;
using Domain.Entities.HealthAndDisease;
using Domain.Entities.PatientExams;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using prontuario.Domain.Entities.PatientMedication;

namespace Domain.Entities.MedicalRecord;

public class MedicalRecordEntity : BaseEntity
{
    public MedicalRecordStatus Status { get; set; } = null!;
    public MedicalRecordStatus StatusInCaseOfAdmission { get; private set; }
    public AnamneseEntity? Anamnese { get; set; }
    public ICollection<PatientExamsEntity> PatientExams { get; set; } = new List<PatientExamsEntity>();
    public ICollection<PatientMedicationEntity> PatientMedications { get; set; } = new List<PatientMedicationEntity>();
    public HealthAndDiseaseEntity HealthAndDisease { get; private set; } = null!;
    public Guid ServiceId { get; private set; }
    public ServiceEntity Service { get; private set; } = null!;
    
    public MedicalRecordEntity() { }

    public MedicalRecordEntity(Guid id, MedicalRecordStatus status, MedicalRecordStatus statusInCaseOfAdmission, AnamneseEntity? anamnese)
    {
        this.Id = id;
        this.Status = status;
        this.StatusInCaseOfAdmission = statusInCaseOfAdmission;
        this.Anamnese = anamnese;
    }
    public void SetHealthAndDisease(HealthAndDiseaseEntity healthAndDisease)
    {
        HealthAndDisease = healthAndDisease;
    }
}