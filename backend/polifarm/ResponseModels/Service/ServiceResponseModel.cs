using Domain.Entities.Service;
using WebApi.ResponseModels.MedicalRecord;
using WebApi.ResponseModels.Service;

namespace prontuario.WebApi.ResponseModels.Service;

public class ServiceResponseModel
{
    public static ServiceResponse CreateFindAllServiceByPatientId(ServiceEntity serviceEntity)
    {
        var service = new ServiceResponseBuilder()
            .WithId(serviceEntity.Id)
            .WithServiceDate(serviceEntity.ServiceDate)
            .WithServiceStatus(serviceEntity.ServiceStatus)
            .WithMedicalRecordResponse(serviceEntity.MedicalRecordEntity == null 
                ? null 
                : MedicalRecordResponseModels.CreateCompleteMedicalRecordResponse(serviceEntity.MedicalRecordEntity!))
            .Build();

        return service;
    }
    
    public static ServiceResponse CreateCompleteService(ServiceEntity serviceEntity)
    {
        var service = new ServiceResponseBuilder()
            .WithId(serviceEntity.Id)
            .WithServiceDate(serviceEntity.ServiceDate)
            .WithServiceStatus(serviceEntity.ServiceStatus)
            .WithMedicalRecordResponse(serviceEntity.MedicalRecordEntity == null 
                ? null 
                : MedicalRecordResponseModels.CreateCompleteMedicalRecordResponse(serviceEntity.MedicalRecordEntity!))
            .Build();

        return service;
    }
}