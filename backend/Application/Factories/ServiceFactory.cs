using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.Enums;
using Domain.ValuesObjects;

namespace Application.Factories;

public class ServiceFactory
{
    public static ServiceEntity CreateServiceToInitializeService(PatientEntity patient, MedicalRecordEntity medicalRecord)
    {
        patient.Status = new PatientStatus(PatientStatusType.IN_SERVICE.ToString());
        
        return new ServiceEntityBuilder()
            .WithServiceDate(DateTime.Now)
            .WithPatient(patient)
            .WithServiceStatus(null)
            .WithMedicalRecordEntity(medicalRecord)
            .Build();
    }
}