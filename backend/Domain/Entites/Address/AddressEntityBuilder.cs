using Domain.ValuesObjects;

namespace Domain.Entities.Address;

public class AddressEntityBuilder
{
    private Guid _id;
    private CEP? _cep;
    private string? _street;
    private string? _city;
    private long? _number;
    private string? _neighborhood;

    public AddressEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public AddressEntityBuilder WithCep(CEP? cep)
    {
        _cep = cep;
        return this;
    }

    public AddressEntityBuilder WithStreet(string? street)
    {
        _street = street;
        return this;
    }

    public AddressEntityBuilder WithCity(string? city)
    {
        _city = city;
        return this;
    }

    public AddressEntityBuilder WithNumber(long? number)
    {
        _number = number;
        return this;
    }

    public AddressEntityBuilder WithNeighborhood(string? neighborhood)
    {
        _neighborhood = neighborhood;
        return this;
    }

    public AddressEntity Build()
    {
        return new AddressEntity(_id, _cep, _street, _city, _number, _neighborhood);
    }
}
