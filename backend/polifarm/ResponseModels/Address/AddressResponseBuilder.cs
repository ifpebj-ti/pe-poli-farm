namespace WebApi.ResponseModels.Address;

public class AddressResponseBuilder
{
    private Guid? _id;
    private string? _cep;
    private string? _city;
    private string? _street;
    private long? _number;
    private string? _neighborhood;

    public AddressResponseBuilder WithId(Guid? id)
    {
        _id = id;
        return this;
    }

    public AddressResponseBuilder WithCep(string? cep)
    {
        _cep = cep;
        return this;
    }

    public AddressResponseBuilder WithCity(string? city)
    {
        _city = city;
        return this;
    }

    public AddressResponseBuilder WithStreet(string? street)
    {
        _street = street;
        return this;
    }

    public AddressResponseBuilder WithNumber(long? number)
    {
        _number = number;
        return this;
    }

    public AddressResponseBuilder WithNeighborhood(string? neighborhood)
    {
        _neighborhood = neighborhood;
        return this;
    }

    public AddressResponse Build()
    {
        return new AddressResponse(
            _id,
            _cep,
            _city,
            _street,
            _number,
            _neighborhood
        );
    }
}