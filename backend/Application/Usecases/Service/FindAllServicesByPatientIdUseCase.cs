using Application.Gateways;
using Domain.Entities.Service;
using Domain.Errors;
using Domain.Utils;

namespace Application.Usecases.Service;

public class FindAllServicesByPatientIdUseCase(IServiceGateway serviceGateway)
{
    public async Task<ResultPattern<PagedResult<List<ServiceEntity>?>>> Execute(Guid patientId, int pageNumber, int pageSize)
    {
        var services = await serviceGateway.FindAllByPatientId(patientId, pageNumber, pageSize);
        return ResultPattern<PagedResult<List<ServiceEntity>?>>.SuccessResult(services);
    }
}