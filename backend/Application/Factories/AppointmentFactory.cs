using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class AppointmentFactory
    {
        public static AppointmentEntity Create(CreateAppointmentDTO dto)
        {
            return new AppointmentEntityBuilder()
                .WithPatientId(dto.PatientId)
                .WithProfessionalId(dto.ProfessionalId)
                .WithSpecialty(dto.Specialty)
                .WithScheduledAt(dto.ScheduledAt)
                .WithStatus(dto.Status)
                .Build();
        }
    }
}
