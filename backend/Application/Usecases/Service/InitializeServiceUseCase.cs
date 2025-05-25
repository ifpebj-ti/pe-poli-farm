using Application.Factories;
using Application.Gateways;
using Domain.Entities.Service;
using Domain.Errors;

namespace prontuario.Application.Usecases.Service;

public class InitializeServiceUseCase(IGatewayPatient gatewayPatient, IServiceGateway serviceGateway)
{
    public async Task<ResultPattern<ServiceEntity>> Execute(Guid patientId)
    {
        var patient = await gatewayPatient.GetById(patientId);
        if(patient is null)
            return ResultPattern<ServiceEntity>.FailureResult("Erro ao iniciar atendimento", 404);
        
        var medicalRecord = MedicalRecordFactory.CreateMedicalRecordToInitScreening();
        var service = ServiceFactory.CreateServiceToInitializeService(patient, medicalRecord);
        await serviceGateway.Init(service);
        
        return ResultPattern<ServiceEntity>.SuccessResult();
    }
}