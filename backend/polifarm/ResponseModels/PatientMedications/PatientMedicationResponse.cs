namespace WebApi.ResponseModels.PatientMedications
{
    public record PatientMedicationResponse(Guid Id, DateTime PrescriptionDate, DateTime? ExecutionDate, string? Description);
}
