using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Prescription
{
    public record CreatePrescriptionDTO(
        DateTime PrescriptionDate,
        DateTime? ExecutionDate,
        string Posology,
        Guid MedicalRecordId,
        Guid ProfessionalId,
        string MedicationName,
        string Type
    );
}
