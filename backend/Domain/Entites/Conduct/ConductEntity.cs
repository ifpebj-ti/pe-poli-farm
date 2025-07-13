using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Conduct
{
    public class ConductEntity : BaseEntity
    {
        public Guid PatientId { get; private set; }
        public PatientEntity Patient { get; set; } = null!;

        public Guid ProfessionalId { get; private set; }
        public UserEntity Professional { get; set; } = null!;

        // ADICIONADO AQUI
        public Guid MedicalRecordId { get; private set; }
        public MedicalRecordEntity MedicalRecord { get; set; } = null!;

        public string ProcedureType { get; private set; } = string.Empty;
        public string MedicationsInUse { get; private set; } = string.Empty;
        public string ConductDescription { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }

        private ConductEntity() { }

        public ConductEntity(Guid patientId, Guid professionalId, Guid medicalRecordId, string procedureType, string medicationsInUse, string conductDescription)
        {
            Id = Guid.NewGuid();
            PatientId = patientId;
            ProfessionalId = professionalId;
            MedicalRecordId = medicalRecordId;
            ProcedureType = procedureType;
            MedicationsInUse = medicationsInUse;
            ConductDescription = conductDescription;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
