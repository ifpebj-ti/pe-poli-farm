using Domain.Entities.MedicalRecord;
using Domain.Entities.Service;
using Domain.Utils;

namespace Application.Gateways;

public interface IServiceGateway : IGenericRepositoryGateway<ServiceEntity>
{
    Task Init(ServiceEntity serviceEntity);
    Task<ServiceEntity?> FindById(Guid serviceId);
    Task<PagedResult<List<ServiceEntity>?>> FindAllByPatientId(Guid patientId, int pageNumber, int pageSize);
    Task InitScreening(MedicalRecordEntity medicalRecordEntity, Guid serviceId);
}