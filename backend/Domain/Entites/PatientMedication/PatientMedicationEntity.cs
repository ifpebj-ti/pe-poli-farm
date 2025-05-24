using Domain.Entites;
using Domain.Entities.MedicalRecord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prontuario.Domain.Entities.PatientMedication
{
    public class PatientMedicationEntity : BaseEntity
    {
        public DateTime PrescriptionDate { get; private set; }
        public DateTime? ExecutionDate { get; private set; }
        public string Description { get; private set; } = string.Empty;
        public Guid MedicalRecordId { get; private set; }
        public MedicalRecordEntity MedicalRecord { get; set; } = null!;

        public PatientMedicationEntity(Guid id, DateTime prescriptionDate, DateTime? executionDate, string description, Guid medicalRecordId)
        {
            Id = id;
            PrescriptionDate = prescriptionDate;
            ExecutionDate = executionDate;
            Description = description;
            MedicalRecordId = medicalRecordId;
        }
        public void FinalizeMedication(DateTime executionDate)
        {
            if (ExecutionDate.HasValue)
                throw new InvalidOperationException("Medicacao ja esta finalizado.");

            ExecutionDate = executionDate;
        }
    }

}
