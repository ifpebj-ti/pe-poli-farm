namespace WebApi.ResponseModels.MedicalCertificate
{
    public record MedicalCertificateResponse
    (
        Guid PatientId,
        Guid ProfessionalId,
        Guid MedicalRecordId,
        string PatientName,
        string Issuer,
        DateTime IssueDate,
        DateTime? ExpiryDate,
        string? Description,
        string? Remarks
    );
}
