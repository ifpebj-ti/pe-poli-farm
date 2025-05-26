using Domain.Entites;
using Domain.Entities.Patient;
using Domain.ValuesObjects;

namespace Domain.Entities.EmergencyContactDetails
{
    public class EmergencyContactDetailsEntity : BaseEntity
    {
        public string? Name { get;  set; }
        public Phone Phone { get;  set; }
        public Relationship Relationship { get;  set; }
        public Guid PatientId { get;  set; }
        public PatientEntity Patient { get;  set; }
        public EmergencyContactDetailsEntity() { }

        public EmergencyContactDetailsEntity(Guid id, string? name, Phone phone, Relationship relationship)
        {
            this.Id = id;
            this.Name = name;
            this.Phone = phone;
            this.Relationship = relationship;
        }
    }
}
