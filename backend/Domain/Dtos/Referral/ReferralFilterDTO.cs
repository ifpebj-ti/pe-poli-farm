using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Referral
{
    public record ReferralFilterDTO
    (
        Guid? MedicalRecordId = null,
        Guid? ProfessionalId = null,
        string? Reason = null,
        string? ExpectedDuration = null
    );
}
