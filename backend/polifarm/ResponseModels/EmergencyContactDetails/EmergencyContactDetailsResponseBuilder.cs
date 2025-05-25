namespace WebApi.ResponseModels.EmergencyContactDetails;

public class EmergencyContactDetailsResponseBuilder
{
    private Guid? _id;
    private string? _name;
    private string? _phone;
    private string? _relationship;

    public EmergencyContactDetailsResponseBuilder WithId(Guid? id)
    {
        _id = id;
        return this;
    }

    public EmergencyContactDetailsResponseBuilder WithName(string? name)
    {
        _name = name;
        return this;
    }

    public EmergencyContactDetailsResponseBuilder WithPhone(string? phone)
    {
        _phone = phone;
        return this;
    }

    public EmergencyContactDetailsResponseBuilder WithRelationship(string? relationship)
    {
        _relationship = relationship;
        return this;
    }

    public EmergencyContactDetailsResponse Build()
    {
        return new EmergencyContactDetailsResponse(
            _id,
            _name,
            _phone,
            _relationship
        );
    }
}