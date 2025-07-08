using Domain.Entites.Referral;

namespace WebApi.ResponseModels.Referral
{
    public class ReferralResponseModels
    {
        public static ReferralResponse ToResponse(ReferralEntity referral)
        {
            return new ReferralResponse
            (
                referral.Id,
                referral.MedicalRecordId,
                referral.ProfessionalId,
                referral.Reason,
                referral.ExpectedDuration
            );
        }

        public static List<ReferralResponse> ToResponseList(List<ReferralEntity> referrals)
        {
            return referrals.Select(ToResponse).ToList();
        }
    }
}
