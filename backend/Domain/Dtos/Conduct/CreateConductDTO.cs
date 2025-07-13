using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Conduct
{
    public record CreateConductDTO(
        Guid PatientId,
        Guid ProfessionalId,
        Guid MedicalRecordId,
        string ProcedureType,
        string MedicationsInUse,
        string ConductDescription
    );
}
