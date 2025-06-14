using Domain.Entites;
using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using prontuario.Domain.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prontuario.Domain.Entities.PatientMedication
{
    public class PatientPrescriptionEntity : BaseEntity
    {
        public DateTime PrescriptionDate { get; private set; }
        public DateTime? ExecutionDate { get; private set; }
        public string Posology { get; private set; } = string.Empty;
        public Guid MedicalRecordId { get; private set; }
        public Guid ProfessionalId { get; private set; }
        public UserEntity Professional { get; set; } = null!;
        public MedicalRecordEntity MedicalRecord { get; set; } = null!;
        public string MedicationName { get; private set; } = string.Empty;
        public string Type { get; private set; } = string.Empty;

        public PatientPrescriptionEntity(Guid id, DateTime prescriptionDate, DateTime? executionDate, string posology, Guid medicalRecordId, Guid professionalId, string medicationName, string type)
        {
            Id = id;
            PrescriptionDate = prescriptionDate;
            ExecutionDate = executionDate;
            Posology = posology;
            MedicalRecordId = medicalRecordId;
            ProfessionalId = professionalId;
            Type = type;
            MedicationName = medicationName;
        }
        public void FinalizeMedication(DateTime executionDate)
        {
            if (ExecutionDate.HasValue)
                throw new InvalidOperationException("Medicacao ja esta finalizado.");

            ExecutionDate = executionDate;
        }
    }

}
