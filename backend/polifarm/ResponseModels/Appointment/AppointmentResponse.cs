using Domain.Enums;

namespace WebApi.ResponseModels.Appointment
{
    public record AppointmentResponse
    (
        Guid Id,
        DateTime ScheduledAt,
        string ProfessionalName,
        string PatientName,
        string Specialty,
        string Status
    );
}
