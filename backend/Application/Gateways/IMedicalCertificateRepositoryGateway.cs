using Domain.Dtos.MedicalCertificate;
using Domain.Entites.MedicalCertificate;

namespace Application.Gateways
{
    public interface IMedicalCertificateRepositoryGateway : IGenericRepositoryGateway<MedicalCertificateEntity>
    {
        Task<List<MedicalCertificateEntity>> GetWithFiltersAsync(MedicalCertificateFilterDTO filters, CancellationToken cancellationToken = default);
    }
}
