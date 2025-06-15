using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.MedicalCertificate
{
    public record CreateCertificateDTO
    (
        Guid MedicalRecordId,
        Guid PatientId,
        Guid ProfessionalId,
        DateTime IssueDate,
        DateTime? ExpiryDate = null,
        string? IssuedBy = null,
        string? Remarks = null,
        string? Description = null
    );
}
