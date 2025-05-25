using Domain.Enums;
using Domain.Exceptions;

namespace prontuario.Domain.ValuesObjects;

public class ServiceStatus
{
    public string? Value { get; private set; }

    public ServiceStatus(string? value)
    {
        if(!string.IsNullOrEmpty(value))
            if (!Enum.IsDefined(typeof(ServiceStatusType), value))
                throw new DomainException("O status do paciente tem que ser um dos seguintes valores: " +
                                        "NO_SERVICE, " +
                                        "SORTING_QUEUE, " +
                                        "SCREENING, " +
                                        "MEDICAL_CARE, ");
        this.Value = value;
    }
}