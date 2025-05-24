using Domain.Entites.User;
using Domain.Entities.Patient;

namespace Domain.Entities.Notes;

public class NotesEntityBuilder
{
    private Guid _id;
    private string _description;
    private DateTime _createdAt;
    private PatientEntity _patient;
    private UserEntity _user;

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

    public NotesEntityBuilder WithPatient(PatientEntity patient)
    {
        _patient = patient;
        return this;
    }

    public NotesEntityBuilder WithUser(UserEntity user)
    {
        _user = user;
        return this;
    }

    public NotesEntity Build()
    {
        return new NotesEntity(_id, _description, _createdAt, _patient, _user);
    }
}
