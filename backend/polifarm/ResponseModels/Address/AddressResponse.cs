namespace WebApi.ResponseModels.Address;

public record AddressResponse(
    Guid? Id,
    string? Cep,
    string? City,
    string? Street,
    long? Number,
    string? Neighborhood
    );