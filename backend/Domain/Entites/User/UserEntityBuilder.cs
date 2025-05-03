using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.ValuesObjects;

namespace Domain.Entities.User;

public class UserEntityBuilder
{
    private Guid _id;
    private string _name = string.Empty;
    private Email _email = null!;
    private CPF _cpf = null!;
    private Positions _position = null!;
    private string _password = string.Empty;
    private bool _firstAccess = false;
    private bool _active = true;
    private ProfileEntity _profile = null!;
    private AccessCodeEntity _accessCode = null!;

    public UserEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public UserEntityBuilder WithName(string name)
    {
        _name = name;
        return this;
    }

    public UserEntityBuilder WithEmail(Email email)
    {
        _email = email;
        return this;
    }

    public UserEntityBuilder WithCpf(CPF cpf)
    {
        _cpf = cpf;
        return this;
    }

    public UserEntityBuilder WithPosition(Positions position)
    {
        _position = position;
        return this;
    }

    public UserEntityBuilder WithPassword(string password)
    {
        _password = password;
        return this;
    }

    public UserEntityBuilder WithFirstAccess(bool firstAccess)
    { 
        _firstAccess = firstAccess;
        return this;
    }

    public UserEntityBuilder WithActive(bool active)
    {
        _active = active;
        return this;
    }
    
    public UserEntityBuilder WithProfile(ProfileEntity profile)
    {
        _profile = profile;
        return this;
    }

    public UserEntityBuilder WithAccessCode(AccessCodeEntity accessCode)
    {
        _accessCode = accessCode;
        return this;
    }
    public UserEntity Build()
    {
        return new UserEntity(_id, _name, _email, _cpf, _position, _password, _firstAccess, _active, _profile, _accessCode);
    }
}