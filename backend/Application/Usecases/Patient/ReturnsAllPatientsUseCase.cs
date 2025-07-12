using Application.Gateways;
using Domain.Entities.Patient;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Patient
{
    public class ReturnsAllPatientsUseCase(IGatewayPatient gatewayPatient)
    {
        public async Task<ResultPattern<List<PatientEntity>>> Execute()
        {
            try
            {
                var patients = await gatewayPatient.GetAllAsync();
                return ResultPattern<List<PatientEntity>>.SuccessResult(patients);
            }
            catch (Exception)
            {
                return ResultPattern<List<PatientEntity>>.InternalError("Erro interno");
            }
        }
    }
}
