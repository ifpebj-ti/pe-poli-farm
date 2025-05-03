using Domain.Entites.Profile;
using Domain.ValuesObjects;

namespace Domain.Entities.Profile;

public class ProfileEntityBuilder
{
    private Guid _id;
    private Role _role = null!;

    public ProfileEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public ProfileEntityBuilder WithRoleType(Role role)
    {
        _role = role;
        return this;
    }

    public ProfileEntity Build()
    {
        return new ProfileEntity(_id, _role);
    }
}