using Domain.Entites;
using Domain.Entites.User;
using Domain.Entities.Patient;

namespace Domain.Entities.Notes;

public class NotesEntity : BaseEntity
{
    public string Description { get; private set; }
    public Guid PatientId { get; private set; }
    public Guid UserId { get; private set; }
    public PatientEntity Patient { get; private set; }
    public UserEntity User { get; private set; }
    public NotesEntity() { }
    public NotesEntity(Guid id, string description, DateTime createdAt, PatientEntity patient, UserEntity user)
    {
        this.Id = id;
        this.Description = description;
        this.CreatedAt = createdAt;
        this.Patient = patient;
        this.User = user;
    }
}
