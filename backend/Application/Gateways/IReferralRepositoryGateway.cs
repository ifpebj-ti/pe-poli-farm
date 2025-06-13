using Domain.Dtos.Appointment;
using Domain.Dtos.Referral;
using Domain.Entites.Appointment;
using Domain.Entites.Referral;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IReferralRepositoryGateway : IGenericRepositoryGateway<ReferralEntity>
    {
        Task<List<ReferralEntity>> GetWithFiltersAsync(ReferralFilterDTO filters, CancellationToken cancellationToken = default);
    }
}
