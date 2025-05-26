using Domain.ValuesObjects;

namespace Domain.Entities.EmergencyContactDetails;

public class EmergencyContactDetailsEntityBuilder
{
    private Guid _id;
    private string? _name;
    private Phone _phone;
    private Relationship? _relationship;

    public EmergencyContactDetailsEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public EmergencyContactDetailsEntityBuilder WithName(string? name)
    {
        _name = name;
        return this;
    }

    public EmergencyContactDetailsEntityBuilder WithPhone(Phone phone)
    {
        _phone = phone;
        return this;
    }

    public EmergencyContactDetailsEntityBuilder WithRelationship(Relationship? relationship)
    {
        _relationship = relationship;
        return this;
    }

    public EmergencyContactDetailsEntity Build()
    {
        return new EmergencyContactDetailsEntity(_id, _name, _phone, _relationship);
    }
}
