using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Patient;

public record CreatePatientDTO(
    string Name,
    string? SocialName,
    DateTime? BirthDate,
    string? Sus,
    string Cpf,
    string? Rg,
    string? Phone,
    string? MotherName,
    AddressDTO Address,
    ICollection<EmergencyContactDetailsDTO> EmergencyContactDetails
);
