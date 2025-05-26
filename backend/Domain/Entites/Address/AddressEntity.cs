using Domain.Entites;
using Domain.Entities.Patient;
using Domain.ValuesObjects;

namespace Domain.Entities.Address
{
    public class AddressEntity : BaseEntity
    {
        public CEP Cep { get;  set; }
        public string? Street { get;  set; }
        public string? City { get;  set; }
        public long? Number { get;  set; }
        public string? Neighborhood { get;  set; }
        public Guid PatientId { get;  set; }
        public PatientEntity Patient { get;  set; }
        public AddressEntity() { }
        public AddressEntity(Guid id, CEP cep, string? street, string? city, long? number, string? neighborhood)
        {
            this.Id = id;
            this.Cep = cep;
            this.Street = street;
            this.City = city;
            this.Number = number;
            this.Neighborhood = neighborhood;
        }
    }
}
