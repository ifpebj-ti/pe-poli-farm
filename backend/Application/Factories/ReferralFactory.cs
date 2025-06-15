using Domain.Dtos.Referral;
using Domain.Entites.Referral;
using System;

namespace Application.Factories
{
    public class ReferralFactory
    {
        public static ReferralEntity CreateReferral(CreateReferralDTO dto)
        {
            return new ReferralEntityBuilder()
                .WithMedicalRecordId(dto.MedicalRecordId)
                .WithProfessionalId(dto.ProfessionalId)
                .WithReason(dto.Reason)
                .WithExpectedDuration(dto.ExpectedDuration)
                .Build();
        }
    }
}
