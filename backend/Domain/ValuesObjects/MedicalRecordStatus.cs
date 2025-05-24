using Domain.Exceptions;

namespace Domain.ValuesObjects;

public class MedicalRecordStatus
{
    public string? Value { get; private set; }

    public MedicalRecordStatus(string? value)
    {
        if(!string.IsNullOrEmpty(value))
            if (!Enum.IsDefined(typeof(Enums.MedicalRecordStatusType), value))
                throw new DomainException("O status do paciente tem que ser um dos seguintes valores: " +
                                      "NO_SERVICE, " +
                                      "SORTING_QUEUE, " +
                                      "SCREENING, " +
                                      "MEDICAL_CARE, " +
                                      "NURSING, " +
                                      "ADMISSION, " +
                                      "OBSERVATION, " +
                                      "MEDICAL_DISCHARGE, " );
        this.Value = value;
    }
}