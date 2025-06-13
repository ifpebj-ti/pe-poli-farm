using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IAppointmentRepository : IGenericRepositoryGateway<AppointmentEntity>
    {
        Task<List<AppointmentEntity>> GetByPatientId(Guid patientId, CancellationToken cancellationToken = default);
        Task<List<AppointmentEntity>> GetAll(CancellationToken cancellationToken = default);
        Task<bool> ExistsAsync(Expression<Func<AppointmentEntity, bool>> predicate, CancellationToken cancellationToken = default);
        Task<List<AppointmentEntity>> GetWithFiltersAsync(AppointmentFilterDTO filters, CancellationToken cancellationToken = default);
    }
}
