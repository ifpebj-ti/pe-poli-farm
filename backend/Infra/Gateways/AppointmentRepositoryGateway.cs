using Application.Gateways;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class AppointmentRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<AppointmentEntity>(context), IAppointmentRepository
    {
        public async Task<List<AppointmentEntity>> GetAll(CancellationToken cancellationToken = default)
        {
            var response = await context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Professional)
                .ToListAsync(cancellationToken);
            return response;
        }

        public async Task<List<AppointmentEntity>> GetByPatientId(Guid patientId, CancellationToken cancellationToken = default)
        {
            var response = await context.Appointments
                            .Include(a => a.Patient)
                            .Include(a => a.Professional)
                            .Where(a => a.PatientId == patientId)
                            .ToListAsync(cancellationToken);

            return response;
        }

        public async Task<bool> ExistsAsync(Expression<Func<AppointmentEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await context.Appointments.AnyAsync(predicate, cancellationToken);
        }

        public async Task<List<AppointmentEntity>> GetWithFiltersAsync(AppointmentFilterDTO filters, CancellationToken cancellationToken = default)
        {
            var query = context.Appointments
                .Include(ap => ap.Patient)
                .Include(ap => ap.Professional)
                .AsQueryable();

            if (filters.PatientId.HasValue)
                query = query.Where(x => x.PatientId == filters.PatientId.Value);

            if (filters.ProfessionalId.HasValue)
                query = query.Where(x => x.ProfessionalId == filters.ProfessionalId.Value);

            if (!string.IsNullOrWhiteSpace(filters.Status.ToString()))
                query = query.Where(x => x.Status == filters.Status);

            if (filters.ScheduledAt.HasValue)
                query = query.Where(x => x.ScheduledAt.Date == filters.ScheduledAt.Value.Date);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
