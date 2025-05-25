using Application.Factories;
using Application.Gateways;
using Domain.Errors;

namespace Application.Usecases.Patient;

public class UpdatePatientStatusUseCase(IGatewayPatient gatewayPatient)
{
    public async Task<ResultPattern<string>> Execute(Guid patientId)
    {
        var patient = await gatewayPatient.GetById(patientId);
        if(patient is null)
            return ResultPattern<string>.NotFound("Erro ao alterar status do paciente");

        var updatedPatient = PatientFactory.CreatePatientToUpdateStatus(patient);
        await gatewayPatient.Save(updatedPatient);
        return ResultPattern<string>.SuccessResult();
    }
}