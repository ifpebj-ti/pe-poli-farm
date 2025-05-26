using Domain.Entites;
using Domain.Entities.MedicalRecord;
using System;

namespace Domain.Entities.PatientExams
{
    public class PatientExamsEntity : BaseEntity
    {

        public DateTime PrescriptionDate { get; private set; }
        public DateTime? ExecutionDate { get; private set; }
        public string Description { get; private set; } = string.Empty;
        public Guid MedicalRecordId { get; private set; }
        public MedicalRecordEntity MedicalRecord { get; set; } = null!;

        public PatientExamsEntity() { }

        public PatientExamsEntity(Guid id, DateTime prescriptionDate, DateTime? executionDate, string description, Guid medicalRecordId)
        {
            Id = id;
            PrescriptionDate = prescriptionDate;
            ExecutionDate = executionDate;
            Description = description;
            MedicalRecordId = medicalRecordId;
        }

        public void FinalizeExam(DateTime executionDate)
        {
            if (ExecutionDate.HasValue)
                throw new InvalidOperationException("Exame ja esta finalizado.");

            ExecutionDate = executionDate;
        }
    }
}
