namespace WebApi.ResponseModels.User;

public record UserResponse(
    Guid? Id,
    string Name,
    string Email,
    string Cpf,
    string Position,
    string Profile
    );