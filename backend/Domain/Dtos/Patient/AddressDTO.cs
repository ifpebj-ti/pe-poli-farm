namespace Domain.Dtos.Patient;

public record AddressDTO(Guid? Id, string? Cep, string? Street, string? City, long? Number, string? Neighborhood)
{
}
