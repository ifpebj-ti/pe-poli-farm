using Domain.Entities.Address;
using Domain.Entities.EmergencyContactDetails;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using prontuario.Domain.ValuesObjects;

namespace Domain.Entities.Patient;

public class PatientEntityBuilder
    {
        private Guid _id;
        private string _name = string.Empty;
        private string? _socialName;
        private DateTime? _birthDate;
        private SUS _sus = null!;
        private CPF _cpf = null!;
        private RG _rg = null!;
        private Phone _phone = null!;
        private string? _motherName;
        private PatientStatus _status = null!;
        private AddressEntity _address = null!;
        private ICollection<EmergencyContactDetailsEntity> _emergencyContactDetails = null!;
        private ICollection<ServiceEntity>? _services;

        public PatientEntityBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public PatientEntityBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public PatientEntityBuilder WithSocialName(string? socialName)
        {
            _socialName = socialName;
            return this;
        }

        public PatientEntityBuilder WithBirthDate(DateTime? birthDate)
        {
            _birthDate = birthDate;
            return this;
        }

        public PatientEntityBuilder WithSus(SUS sus)
        {
            _sus = sus;
            return this;
        }

        public PatientEntityBuilder WithCpf(CPF cpf)
        {
            _cpf = cpf;
            return this;
        }

        public PatientEntityBuilder WithRg(RG rg)
        {
            _rg = rg;
            return this;
        }

        public PatientEntityBuilder WithPhone(Phone phone)
        {
            _phone = phone;
            return this;
        }

        public PatientEntityBuilder WithMotherName(string? motherName)
        {
            _motherName = motherName;
            return this;
        }

        public PatientEntityBuilder WithStatus(PatientStatus status)
        {
            _status = status;
            return this;
        }

        public PatientEntityBuilder WithAddress(AddressEntity address)
        {
            _address = address;
            return this;
        }

        public PatientEntityBuilder WithEmergencyContactDetails(ICollection<EmergencyContactDetailsEntity> emergencyContactDetails)
        {
            _emergencyContactDetails = emergencyContactDetails;
            return this;
        }

        public PatientEntityBuilder WithServices(ICollection<ServiceEntity>? services)
        {
            _services = services;
            return this;
        }

        public PatientEntity Build()
        {
            return new PatientEntity(
                _id,
                _name,
                _socialName,
                _birthDate,
                _sus,
                _cpf,
                _rg,
                _phone,
                _motherName,
                _status,
                _address,
                _emergencyContactDetails,
                _services
            );
        }
    }