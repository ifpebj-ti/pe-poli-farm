namespace WebApi.ResponseModels.PatientMedications
{
    public record PatientPrescriptionResponse(Guid Id, DateTime PrescriptionDate, DateTime? ExecutionDate, string? Posology, string? Type, string? Name);
}
