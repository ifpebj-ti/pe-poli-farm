using Domain.Entities.Address;
using WebApi.ResponseModels.Address;

namespace WebApi.ResponseModels.Address;

public class AddressResponseFactory
{
    public static AddressResponse CreateCompleteAddressResponse(AddressEntity addressEntity)
    {
        return new AddressResponseBuilder()
            .WithId(addressEntity.Id)
            .WithStreet(addressEntity.Street)
            .WithCity(addressEntity.City)
            .WithNeighborhood(addressEntity.Neighborhood)
            .WithNumber(addressEntity.Number)
            .WithCep(addressEntity.Cep.Value)
            .Build();
    }
}