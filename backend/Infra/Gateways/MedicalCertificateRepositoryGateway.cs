using Application.Gateways;
using Domain.Dtos.Appointment;
using Domain.Dtos.MedicalCertificate;
using Domain.Entites.Appointment;
using Domain.Entites.MedicalCertificate;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class MedicalCertificateRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<MedicalCertificateEntity>(context), IMedicalCertificateRepositoryGateway
    {
        public async Task<List<MedicalCertificateEntity>> GetWithFiltersAsync(MedicalCertificateFilterDTO filters, CancellationToken cancellationToken = default)
        {
            var query = context.MedicalCertificates.Include(mc => mc.Patient).Include(mc => mc.Professional).Include(mc => mc.MedicalRecord).AsQueryable();

            if (filters.PatientId.HasValue)
                query = query.Where(x => x.PatientId == filters.PatientId.Value);

            if (filters.ProfessionalId.HasValue)
                query = query.Where(x => x.ProfessionalId == filters.ProfessionalId.Value);


            if (filters.IssueDate.HasValue)
                query = query.Where(x => x.IssueDate.Date == filters.IssueDate.Value.Date);

            if (filters.MedicalRecordId.HasValue)
                query = query.Where(x => x.MedicalRecordId == filters.MedicalRecordId);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
