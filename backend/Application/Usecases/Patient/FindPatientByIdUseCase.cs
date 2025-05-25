using Application.Gateways;
using Domain.Entities.Patient;
using Domain.Errors;
using Domain.Exceptions;
using Domain.ValuesObjects;

namespace Application.Usecases.Patient;

public class FindPatientByIdUseCase(IGatewayPatient gatewayPatient)
{
    public async Task<ResultPattern<PatientEntity?>> Execute(string patientCPF)
    {
        try
        {
            CPF cpf = new(patientCPF);
            var patient = await gatewayPatient.GetByCpf(cpf.Value);
            return ResultPattern<PatientEntity?>.SuccessResult(patient);
        }
        catch (DomainException dem)
        {
            return ResultPattern<PatientEntity?>.BadRequest(dem.Message);
        }
        catch (Exception)
        {
            return ResultPattern<PatientEntity?>.InternalError("Erro interno");
        }
    }
}