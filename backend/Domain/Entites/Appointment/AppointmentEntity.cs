using Domain.Entites.User;
using Domain.Entities.Patient;
using Domain.Enums;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Appointment
{
    public class AppointmentEntity : BaseEntity
    {
        public Guid PatientId { get; private set; }
        public PatientEntity Patient { get; private set; } = null!;
        public Guid? ProfessionalId { get; private set; }
        public UserEntity? Professional { get; private set; }
        public string Specialty { get; private set; } = string.Empty;
        public DateTime ScheduledAt { get; private set; }
        public AppointmentStatusEnum Status { get; private set; }

        protected AppointmentEntity() { }

        public AppointmentEntity(Guid id, Guid patientId, Guid? professionalId, string specialty, DateTime scheduledAt, AppointmentStatusEnum status)
        {
            Id = id;
            PatientId = patientId;
            ProfessionalId = professionalId;
            Specialty = specialty;
            ScheduledAt = scheduledAt;
            Status = status;
        }

        public void Confirm(Guid professionalId)
        {
            ProfessionalId = professionalId;
            Status = AppointmentStatusEnum.Confirmed;
        }

        public void Cancel()
        {
            if (Status == AppointmentStatusEnum.Completed || Status == AppointmentStatusEnum.Canceled)
            {
                throw new DomainException("Não é possivel cancelar um agendamento concluído/cancelado.");
            }
            Status = AppointmentStatusEnum.Canceled;
        }

        public void ChangeStatus(AppointmentStatusEnum newStatus)
        {
            if (Status == AppointmentStatusEnum.Completed || Status == AppointmentStatusEnum.Canceled)
            {
                throw new DomainException("Não é possivel cancelar um agendamento concluído/cancelado.");
            }

            if (newStatus == Status)
            {
                throw new DomainException($"O agendamento já está marcado como {newStatus}");
            }
            Status = newStatus;
        }
    }
}
