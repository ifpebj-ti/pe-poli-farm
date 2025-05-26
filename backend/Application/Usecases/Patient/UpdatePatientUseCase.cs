using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Patient;
using Domain.Errors;

namespace Application.Usecases.Patient;

public class UpdatePatientUseCase(IGatewayPatient gatewayPatient)
{
    public async Task<ResultPattern<string>> Execute(UpdatePatientDTO data)
    {
        var patient = await gatewayPatient.GetById(data.Id);
        var patientUpdated = PatientFactory.CreatePatientToUpdate(data, patient!);
        await gatewayPatient.Update(patientUpdated);
        return ResultPattern<string>.SuccessResult();
    }
}