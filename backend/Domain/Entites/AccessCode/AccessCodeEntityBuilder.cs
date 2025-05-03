using Domain.Entites.AccessCode;

namespace Domain.Entities.AccessCode;

public class AccessCodeEntityBuilder
{
    private Guid _id;
    private string _code = string.Empty;
    private bool _isActive;
    private bool _isUserUpdatePassword;
    private DateTime _experimentDate;

    public AccessCodeEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public AccessCodeEntityBuilder WithCode(string code)
    {
        _code = code;
        return this;
    }

    public AccessCodeEntityBuilder WithIsActive(bool isActive)
    {
        _isActive = isActive;
        return this;
    }

    public AccessCodeEntityBuilder WithIsUserUpdatePassword(bool isUserUpdatePassword)
    {
        _isUserUpdatePassword = isUserUpdatePassword;
        return this;
    }
    
    public AccessCodeEntityBuilder WithExperimentDate(DateTime experimentDate)
    {
        _experimentDate = experimentDate;
        return this;
    }

    public AccessCodeEntity Build()
    {
        return new AccessCodeEntity(_id, _code, _isActive, _isUserUpdatePassword, _experimentDate);
    }
}