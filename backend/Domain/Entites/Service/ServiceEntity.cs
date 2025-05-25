using Domain.Entites;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using Domain.ValuesObjects;

namespace Domain.Entities.Service
{
    public class ServiceEntity : BaseEntity
    {
        public string? ServiceStatus { get; set; }
        public DateTime ServiceDate { get; private set; }
        public MedicalRecordEntity? MedicalRecordEntity { get; set; }
        public PatientEntity PatientEntity { get; set; } = null!;
        public Guid PatientId { get; private set; }
        public ServiceEntity() { }

        public ServiceEntity(Guid id, string? serviceStatus, DateTime serviceDate, PatientEntity patientEntity, MedicalRecordEntity? medicalRecordEntity)
        {
            this.Id = id;
            this.ServiceStatus = serviceStatus;
            this.ServiceDate = serviceDate;
            this.PatientEntity = patientEntity;
            this.MedicalRecordEntity = medicalRecordEntity;
        }
    }
}
