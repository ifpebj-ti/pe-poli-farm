namespace Domain.Dtos.Patient;

public record AddressDTO(long? Id, string? Cep, string? Street, string? City, long? Number, string? Neighborhood)
{
}
