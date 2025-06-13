using Application.Gateways;
using Domain.Enums;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Appointment
{
    public class UpdateAppointmentStatusUseCase
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public UpdateAppointmentStatusUseCase(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public async Task<ResultPattern<string>> Execute(Guid id, AppointmentStatusEnum newStatus, CancellationToken cancellationToken)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);

            if (appointment is null)
                return ResultPattern<string>.FailureResult("Agendamento não encontrado", 404);

            appointment.ChangeStatus(newStatus);

            await _appointmentRepository.UpdateAsync(appointment);

            return ResultPattern<string>.SuccessResult("Status atualizado com sucesso.");
        }
    }

}
