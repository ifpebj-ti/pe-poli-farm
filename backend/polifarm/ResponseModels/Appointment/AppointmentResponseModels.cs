using Domain.Entites.Appointment;
using Domain.Enums;

namespace WebApi.ResponseModels.Appointment
{
    public class AppointmentResponseModels
    {
        public static AppointmentResponse CreateAppointmentResponse(AppointmentEntity appointment)
        {
            return new AppointmentResponse(
            appointment.Id,
            appointment.ScheduledAt,
            appointment.Professional!.Name,
            appointment.Patient.Name,
            appointment.Specialty,
            appointment.Status.ToString());
        }

        public static List<AppointmentResponse> CreateAppointmentListResponse(List<AppointmentEntity> appointments)
        {
            return appointments.Select(CreateAppointmentResponse).ToList();
        }
    }
}
