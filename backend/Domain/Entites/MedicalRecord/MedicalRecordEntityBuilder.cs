using Domain.Entities.Anamnese;
using Domain.Entities.Service;
using Domain.ValuesObjects;

namespace Domain.Entities.MedicalRecord;

public class MedicalRecordEntityBuilder
{
    private Guid _id;
    private MedicalRecordStatus _status = null!;
    private MedicalRecordStatus _statusInCaseOfAdmission = null!;
    private AnamneseEntity? _anamnese;

    public MedicalRecordEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public MedicalRecordEntityBuilder WithStatus(MedicalRecordStatus status)
    {
        _status = status;
        return this;
    }

    public MedicalRecordEntityBuilder WithStatusInCaseOfAdmission(MedicalRecordStatus statusInCaseOfAdmission)
    {
        _statusInCaseOfAdmission = statusInCaseOfAdmission;
        return this;
    }
    
    public MedicalRecordEntityBuilder WithAnamnese(AnamneseEntity? anamnese)
    {
        _anamnese = anamnese;
        return this;
    }

    public MedicalRecordEntity Build()
    {
        return new MedicalRecordEntity(_id, _status, _statusInCaseOfAdmission, _anamnese);
    }
}