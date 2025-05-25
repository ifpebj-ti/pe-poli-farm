using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Patient;
using Domain.Errors;

namespace Application.Usecases.Patient
{
    public class CreatePatientUseCase(IGatewayPatient gatewayPatient)
    {
        public async Task<ResultPattern<string>> Execute(CreatePatientDTO data)
        {
            var patient = await gatewayPatient.GetByCpf(data.Cpf);
            if(patient != null)
                return ResultPattern<string>.BadRequest("Paciente já está cadastrado");
            var patientEntity = PatientFactory.CreatePatient(data);
            await gatewayPatient.Save(patientEntity);
            return ResultPattern<string>.SuccessResult();
        }
    }
}
