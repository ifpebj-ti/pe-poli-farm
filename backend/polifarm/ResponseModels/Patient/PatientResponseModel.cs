using Domain.Entities.Patient;
using prontuario.WebApi.ResponseModels.Service;
using WebApi.ResponseModels.Address;
using WebApi.ResponseModels.EmergencyContactDetails;

namespace WebApi.ResponseModels.Patient
{
    public class PatientResponseModel
    {
        public static PatientResponse CreateGetAllPatientResponse(PatientEntity entity)
        {
            var patient = new PatientResponseBuilder()
                .WithId(entity.Id)
                .WithName(entity.Name)
                .WithBirthDate(entity.BirthDate)
                .WithSus(entity.Sus.Value)
                .WithCpf(entity.Cpf.Value)
                .WithPhone(entity.Phone.Value)
                .WithMotherName(entity.MotherName)
                .WithAddress(AddressResponseFactory.CreateCompleteAddressResponse(entity.AddressEntity))
                .WithEmergencyContactDetails(entity.EmergencyContactDetailsEntity.Select(EmergencyContactDetailsResponseFactory.CreateCompleteEmergencyContactDetailsResponse)
                    .ToList())
                .WithServices(entity.ServicesEntity?.Select(ServiceResponseModel.CreateCompleteService).ToList())
                .Build();

            return patient;
        }

        public static PatientResponse CreateFindPatientById(PatientEntity entity)
        {
            return new PatientResponseBuilder()
                .WithId(entity.Id)
                .WithName(entity.Name)
                .WithSocialName(entity.SocialName)
                .WithBirthDate(entity.BirthDate)
                .WithCpf(entity.Cpf.Value)
                .WithPhone(entity.Phone.Value)
                .WithRg(entity.Rg.Value)
                .WithSus(entity.Sus.Value)
                .WithStatus(entity.Status.Value)
                .WithMotherName(entity.MotherName)
                .WithServices(entity.ServicesEntity?.Select(ServiceResponseModel.CreateCompleteService).ToList())
                .WithAddress(AddressResponseFactory.CreateCompleteAddressResponse(entity.AddressEntity))
                .WithEmergencyContactDetails(entity.EmergencyContactDetailsEntity.Select(EmergencyContactDetailsResponseFactory.CreateCompleteEmergencyContactDetailsResponse)
                    .ToList())
                .Build();
        }
    }
}
