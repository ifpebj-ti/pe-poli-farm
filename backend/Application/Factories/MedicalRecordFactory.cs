using Domain.Entities.Anamnese;
using Domain.Entities.MedicalRecord;
using Domain.Enums;
using Domain.ValuesObjects;

namespace Application.Factories;

public class MedicalRecordFactory
{
    public static MedicalRecordEntity CreateMedicalRecordToInitScreening()
    {
        return new MedicalRecordEntityBuilder()
            .WithStatus(new MedicalRecordStatus(MedicalRecordStatusType.SCREENING.ToString()))
            .WithStatusInCaseOfAdmission(new MedicalRecordStatus(null))
            .Build();
    }
    public static MedicalRecordEntity CreateMedicalRecordWithAnamnese(MedicalRecordEntity medicalRecordEntity, AnamneseEntity anamneseEntity)
    {
        medicalRecordEntity.Anamnese = anamneseEntity;
        medicalRecordEntity.Status = new MedicalRecordStatus(MedicalRecordStatusType.MEDICAL_CARE.ToString());
        return medicalRecordEntity;
    }
}