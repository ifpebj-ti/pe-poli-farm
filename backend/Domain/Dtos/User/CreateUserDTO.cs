using Domain.Dtos.Profile;

namespace Domain.Dtos.User;

public record CreateUserDTO(
    string Name,
    string Email,
    string Cpf,
    string Position,
    ProfileDTO Profile
    );