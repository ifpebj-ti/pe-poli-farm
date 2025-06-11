using Application.Factories;
using Application.Gateways;
using Domain.Dtos.MedicalCertificate;
using Domain.Entites.MedicalCertificate;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.MedicalCertificate
{
    public class CreateMedicalCertificateUseCase(IGenericRepositoryGateway<MedicalCertificateEntity> repository)
    {
        public async Task<ResultPattern<MedicalCertificateEntity>> Execute(CreateCertificateDTO dto)
        {
            try
            {
                var medicalCertificate = MedicalCertificateFactory.Create(dto);
                await repository.AddAsync(medicalCertificate);
                return ResultPattern<MedicalCertificateEntity>.SuccessResult(medicalCertificate);
            }
            catch (DomainException dex)
            {
                return ResultPattern<MedicalCertificateEntity>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
               return ResultPattern<MedicalCertificateEntity>.FailureResult("Erro interno ao emitir certificado", 500);
            }
        }
    }
}
