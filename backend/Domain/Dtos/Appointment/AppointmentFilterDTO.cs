using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Appointment
{
    public record AppointmentFilterDTO
    (
        Guid? PatientId = null,
        Guid? ProfessionalId = null,
        AppointmentStatusEnum? Status = null,
        DateTime? ScheduledAt = null
    );
}
