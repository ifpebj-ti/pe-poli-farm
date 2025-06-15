using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Referral;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Referral
{
    public class CreateReferralUseCase(IReferralRepositoryGateway referralRepository)
    {
        public async Task<ResultPattern<string>> Execute(CreateReferralDTO dto, CancellationToken cancellationToken = default)
        {
            try
            {
                var referral = ReferralFactory.CreateReferral(dto);
                await referralRepository.AddAsync(referral);
                return ResultPattern<string>.SuccessResult("Encaminhamento criado com sucesso");
            }
            catch (DomainException dex)
            {
                return ResultPattern<string>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<string>.FailureResult("Erro interno", 500);
            }
        }
    }
}
