using Application.Gateways;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Appointment
{
    public class GetAppointmentsUseCase(IAppointmentRepository appointmentRepository)
    {
        private readonly IAppointmentRepository _appointmentRepository = appointmentRepository;

        public async Task<ResultPattern<List<AppointmentEntity>>> Execute(AppointmentFilterDTO filters, CancellationToken cancellationToken = default)
        {
            try
            {
                var appointments = await _appointmentRepository.GetWithFiltersAsync(filters, cancellationToken);
                return ResultPattern<List<AppointmentEntity>>.SuccessResult(appointments);
            }
            catch (Exception)
            {
                return ResultPattern<List<AppointmentEntity>>.FailureResult("Erro interno", 500);
            }
        }
    }

}
