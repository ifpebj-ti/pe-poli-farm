using Domain.Entites;
using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using Domain.ValuesObjects;
using System;

namespace Domain.Entities.PatientExams
{
    public class PatientExamsEntity : BaseEntity
    {

        public DateTime PrescriptionDate { get; private set; }
        public DateTime? ExecutionDate { get; private set; }
        public string Description { get; private set; } = string.Empty;
        public string Name { get; private set; } = string.Empty;
        public Guid MedicalRecordId { get; private set; }
        public ExamPriorityStatus Priority { get; private set; } = new ExamPriorityStatus("NORMAL");
        public MedicalRecordEntity MedicalRecord { get; set; } = null!;
        public Guid ProfessionalId { get; private set; }
        public UserEntity Professional { get; set; } = null!;

        public PatientExamsEntity() { }

        public PatientExamsEntity(Guid id, DateTime prescriptionDate, DateTime? executionDate, string name, string description, ExamPriorityStatus priority, Guid medicalRecordId, Guid professionalId)
        {
            Id = id;
            PrescriptionDate = prescriptionDate;
            ExecutionDate = executionDate;
            Description = description;
            MedicalRecordId = medicalRecordId;
            Name = name;
            Priority = priority;
            ProfessionalId = professionalId;
        }

        public void FinalizeExam(DateTime executionDate)
        {
            if (ExecutionDate.HasValue)
                throw new InvalidOperationException("Exame ja esta finalizado.");

            ExecutionDate = executionDate;
        }
    }
}
