namespace WebApi.ResponseModels.PatientExams
{
    public record PatientExamResponse
    (
        Guid Id,
        string Name,
        string Description,
        DateTime PrescriptionDate,
        DateTime? ExecutionDate,
        string Priority,
        string ProfessionalName
    );
}
