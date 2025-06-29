using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Appointment;
using Domain.Enums;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Appointment
{
    public class CreateAppointmentUseCase(IAppointmentRepository appointmentRepository)
    {
        public async Task<ResultPattern<string>> Execute(CreateAppointmentDTO dto, CancellationToken cancellationToken = default)
        {
            try
            {
                var hasConflict = await appointmentRepository
                .ExistsAsync(x =>
                    x.ProfessionalId == dto.ProfessionalId &&
                    x.ScheduledAt == dto.ScheduledAt &&
                    x.Status != AppointmentStatusEnum.Canceled, cancellationToken);

                if (hasConflict)
                    return ResultPattern<string>.BadRequest("Já existe um agendamento para esse profissional neste horário.");

                var appointment = AppointmentFactory.Create(dto);

                await appointmentRepository.AddAsync(appointment);

                return ResultPattern<string>.SuccessResult("Agendamento criado com sucesso.");
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
