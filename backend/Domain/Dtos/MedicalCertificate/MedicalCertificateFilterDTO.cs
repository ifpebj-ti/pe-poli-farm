using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.MedicalCertificate
{
    public record MedicalCertificateFilterDTO
    (
        Guid? PatientId = null,
        Guid? ProfessionalId = null,
        DateTime? IssueDate = null,
        Guid? MedicalRecordId = null
    );
}
