using Domain.Entites.User;
using Domain.Entities.Patient;

namespace Domain.Entities.Notes;

public class NotesEntityBuilder
{
    private Guid _id;
    private string _description;
    private DateTime _createdAt;
    private Guid _patientId;
    private Guid _professionalId;

    public NotesEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }
    
    public NotesEntityBuilder WithDescription(string description)
    {
        _description = description;
        return this;
    }
    
    public NotesEntityBuilder WithCreatedAt(DateTime date)
    {
        _createdAt = date;
        return this;
    }

    public NotesEntityBuilder WithPatientId(Guid patientId)
    {
        _patientId = patientId;
        return this;
    }

    public NotesEntityBuilder WithProfessionalId(Guid professionalId)
    {
        _professionalId = professionalId;
        return this;
    }

    public NotesEntity Build()
    {
        return new NotesEntity(_id, _description, _createdAt, _patientId, _professionalId);
    }
}
