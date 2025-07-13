namespace WebApi.ResponseModels.Referral
{
    public record ReferralResponse
    (
        Guid Id,
        Guid MedicalRecordId,
        Guid ProfessionalId,
        string Reason,
        string ExpectedDuration
    );
}
