using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Referral
{
    public record CreateReferralDTO
    (
        Guid MedicalRecordId,
        Guid ProfessionalId,
        string Reason,
        string ExpectedDuration
     );
}
