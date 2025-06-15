using Application.Gateways;
using Domain.Dtos.Referral;
using Domain.Entites.Referral;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Referral
{
    public class GetReferralUseCase(IReferralRepositoryGateway referralRepository)
    {
        public async Task<ResultPattern<List<ReferralEntity>>> Execute(ReferralFilterDTO filters, CancellationToken cancellationToken = default)
        {
            try
            {
                var referrals = await referralRepository.GetWithFiltersAsync(filters, cancellationToken);
                return ResultPattern<List<ReferralEntity>>.SuccessResult(referrals);
            }
            catch (DomainException dex)
            {
                return ResultPattern<List<ReferralEntity>>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<List<ReferralEntity>>.FailureResult("Erro interno", 500);
            }
        }
    }
}
