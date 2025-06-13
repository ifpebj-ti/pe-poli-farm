namespace WebApi.ResponseModels.Note
{
    public record NoteResponse
    (
        Guid Id,
        string Title,
        DateTime CreatedAt,
        string PatientName,
        string ProfessionalName
    );
}
