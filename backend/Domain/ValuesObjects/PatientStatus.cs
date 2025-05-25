using Domain.Enums;
using Domain.Exceptions;

namespace Domain.ValuesObjects;

public class PatientStatus
{
    public string? Value { get; private set; }

    public PatientStatus(string? value)
    {
        if(!string.IsNullOrEmpty(value))
            if (!Enum.IsDefined(typeof(PatientStatusType), value))
                throw new DomainException("O status do paciente tem que ser um dos seguintes valores: NO_SERVICE e IN_SERVICE");
        this.Value = value;
    }
}