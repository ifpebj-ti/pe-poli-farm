using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Appointment
{
    public record CreateAppointmentDTO
    (
        Guid PatientId,
        Guid? ProfessionalId,
        string Specialty,
        DateTime ScheduledAt,
        AppointmentStatusEnum Status
     );
}
