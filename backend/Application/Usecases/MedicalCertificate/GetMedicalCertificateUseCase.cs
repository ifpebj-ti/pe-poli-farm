using Application.Gateways;
using Domain.Dtos.MedicalCertificate;
using Domain.Entites.MedicalCertificate;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.MedicalCertificate
{
    public class GetMedicalCertificateUseCase(IMedicalCertificateRepositoryGateway certificateRepository)
    {
        public async Task<ResultPattern<List<MedicalCertificateEntity>>> Execute(MedicalCertificateFilterDTO filters, CancellationToken cancellationToken = default)
        {
            try
            {
                var medicalCertificates = await certificateRepository.GetWithFiltersAsync(filters, cancellationToken);
                return ResultPattern<List<MedicalCertificateEntity>>.SuccessResult(medicalCertificates);
            }
            catch (Exception)
            {
                return ResultPattern<List<MedicalCertificateEntity>>.FailureResult("Erro interno ao buscar certificados médicos", 500);
            }
        }
    }
}
