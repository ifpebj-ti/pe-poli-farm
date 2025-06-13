using Application.Gateways;
using Domain.Dtos.Referral;
using Domain.Entites.Referral;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class ReferralRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<ReferralEntity>(context), IReferralRepositoryGateway
    {
        public async Task<List<ReferralEntity>> GetWithFiltersAsync(ReferralFilterDTO filters, CancellationToken cancellationToken = default)
        {
            var query = context.Referrals
                .Include(rf => rf.Professional)
                .Include(rf => rf.MedicalRecord)
                    .ThenInclude(mr => mr.Service)
                        .ThenInclude(s => s.PatientEntity)
                .AsQueryable();

            if (filters.MedicalRecordId.HasValue)
                query = query.Where(x => x.MedicalRecordId == filters.MedicalRecordId.Value);

            if (filters.ProfessionalId.HasValue)
                query = query.Where(x => x.ProfessionalId == filters.ProfessionalId.Value);

            if (!string.IsNullOrWhiteSpace(filters.Reason))
                query = query.Where(x => x.Reason == filters.Reason);

            if (!string.IsNullOrWhiteSpace(filters.ExpectedDuration))
                query = query.Where(x => x.ExpectedDuration == filters.ExpectedDuration);

            var response = await query.ToListAsync(cancellationToken);

            return response;
        }
    }
}
