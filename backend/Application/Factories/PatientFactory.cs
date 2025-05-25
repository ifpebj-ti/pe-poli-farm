using Domain.Dtos.Patient;
using Domain.Entities.Address;
using Domain.Entities.EmergencyContactDetails;
using Domain.Entities.Patient;
using Domain.Enums;
using Domain.ValuesObjects;
using prontuario.Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class PatientFactory
    {
        public static PatientEntity CreatePatient(CreatePatientDTO data)
        {
            return new PatientEntityBuilder()
                .WithName(data.Name)
                .WithSocialName(data.SocialName)
                .WithBirthDate(data.BirthDate)
                .WithSus(new SUS(data.Sus))
                .WithCpf(new CPF(data.Cpf))
                .WithRg(new RG(data.Rg))
                .WithPhone(new Phone(data.Phone))
                .WithMotherName(data.MotherName)
                .WithStatus(new PatientStatus(PatientStatusType.NO_SERVICE.ToString()))
                .WithAddress(new AddressEntityBuilder()
                    .WithCep(new CEP(data.Address?.Cep))
                    .WithCity(data.Address?.City)
                    .WithStreet(data.Address?.Street)
                    .WithNumber(data.Address?.Number)
                    .WithNeighborhood(data.Address?.Neighborhood)
                    .Build())
                .WithEmergencyContactDetails(data.EmergencyContactDetails.Select(em => new EmergencyContactDetailsEntityBuilder()
                        .WithName(em.Name)
                        .WithPhone(new Phone(em.Phone))
                        .WithRelationship(new Relationship(em.Relationship))
                        .Build())
                    .ToList())
                .Build();
        }

        public static PatientEntity CreatePatientToUpdateStatus(PatientEntity patient)
        {
            patient.Status = patient.Status.Value == PatientStatusType.NO_SERVICE.ToString()
                ? new PatientStatus(PatientStatusType.IN_SERVICE.ToString())
                : new PatientStatus(PatientStatusType.NO_SERVICE.ToString());

            return patient;
        }

        public static PatientEntity CreatePatientToUpdate(UpdatePatientDTO data, PatientEntity patient)
        {
            patient.Name = data.Name;
            patient.SocialName = data.SocialName;
            patient.BirthDate = data.BirthDate;
            patient.Sus = new SUS(data.Sus);
            patient.Cpf = new CPF(data.Cpf);
            patient.Rg = new RG(data.Rg);
            patient.Phone = new Phone(data.Phone);
            patient.MotherName = data.MotherName;
            patient.AddressEntity.Cep = new CEP(data.Address?.Cep);
            patient.AddressEntity.City = data.Address?.City;
            patient.AddressEntity.Street = data.Address?.Street;
            patient.AddressEntity.Number = data.Address?.Number;
            patient.AddressEntity.Neighborhood = data.Address?.Neighborhood;
            foreach (var contact in data.EmergencyContactDetails)
            {
                var existingContact = patient.EmergencyContactDetailsEntity
                    .FirstOrDefault(e => e.Id == contact.Id);

                if (existingContact != null)
                {
                    existingContact.Name = contact.Name;
                    existingContact.Phone = new Phone(contact.Phone);
                    existingContact.Relationship = new Relationship(contact.Relationship);
                }
                else
                {
                    var newContact = new EmergencyContactDetailsEntity
                    {
                        Name = contact.Name,
                        Phone = new Phone(contact.Phone),
                        Relationship = new Relationship(contact.Relationship)
                    };
                    patient.EmergencyContactDetailsEntity.Add(newContact);
                }
            }

            return patient;
        }
    }
}
