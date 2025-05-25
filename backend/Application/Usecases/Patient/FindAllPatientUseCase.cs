using Application.Gateways;
using Domain.Entities.Patient;
using Domain.Errors;
using Domain.Utils;

namespace Application.Usecases.Patient;

public class FindAllPatientUseCase(IGatewayPatient gatewayPatient)
{
    public async Task<ResultPattern<PagedResult<List<PatientEntity>?>>> Execute(string filter = "", string status = "", int pagenumber = 0, int pagesize = 20)
    {
        var result = await gatewayPatient.GetByFilterList(filter, status, pagenumber, pagesize);
        return ResultPattern<PagedResult<List<PatientEntity>?>>.SuccessResult(result);
    }
}