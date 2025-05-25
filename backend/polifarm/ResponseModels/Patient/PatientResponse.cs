using WebApi.ResponseModels.Address;
using WebApi.ResponseModels.EmergencyContactDetails;
using WebApi.ResponseModels.Service;

namespace WebApi.ResponseModels.Patient;

public record PatientResponse(
    Guid? Id, 
    string Name, 
    string? SocialName,
    DateTime? BirthDate, 
    string? Sus, 
    string Cpf, 
    string? Rg, 
    string? Phone, 
    string? MotherName,
    string? Status,
    AddressResponse Address, 
    ICollection<EmergencyContactDetailsResponse> EmergencyContactDetails,
    ICollection<ServiceResponse>? services);