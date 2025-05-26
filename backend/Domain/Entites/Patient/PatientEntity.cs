using Domain.Entites;
using Domain.Entities.Address;
using Domain.Entities.EmergencyContactDetails;
using Domain.Entities.Notes;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using prontuario.Domain.ValuesObjects;

namespace Domain.Entities.Patient
{
    public class PatientEntity : BaseEntity
    {
        public string Name { get;  set; } = string.Empty;
        public string? SocialName { get; set; }
        public DateTime? BirthDate { get;  set; }
        public SUS Sus { get;  set; } = null!;
        public CPF Cpf { get;  set; } = null!;
        public RG Rg { get;  set; } = null!;
        public Phone Phone { get;  set; } = null!;
        public string? MotherName { get;  set; }
        public PatientStatus Status { get; set; } = null!;
        public AddressEntity AddressEntity { get; set; } = null!;
        public ICollection<EmergencyContactDetailsEntity> EmergencyContactDetailsEntity { get; set; } = null!;
        public ICollection<ServiceEntity>? ServicesEntity { get; set; }
        public ICollection<NotesEntity>? NotesEntity { get; set; }

        public PatientEntity() { }
        public PatientEntity(
            Guid id,
            string name,
            string? socialName,
            DateTime? dateBirth, 
            SUS sus, 
            CPF cpf, 
            RG rg, 
            Phone phone,
            string? motherName,
            PatientStatus status,
            AddressEntity addressEntity,
            ICollection<EmergencyContactDetailsEntity> emergencyContactDetailsEntity,
            ICollection<ServiceEntity>? serviceEntities)
        {
            this.Id = id;
            this.Name = name;
            this.SocialName = socialName;
            this.BirthDate = dateBirth;
            this.Sus = sus;
            this.Cpf = cpf;
            this.Rg = rg;
            this.Phone = phone;
            this.MotherName = motherName;
            this.Status = status;
            this.AddressEntity = addressEntity;
            this.EmergencyContactDetailsEntity = emergencyContactDetailsEntity;
            this.ServicesEntity = serviceEntities;
        }
    }
}
