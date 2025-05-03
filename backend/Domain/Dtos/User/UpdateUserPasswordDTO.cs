namespace Domain.Dtos.User;

public record UpdateUserPasswordDTO(
    string Email,
    string Password,
    string AccessCode
    );