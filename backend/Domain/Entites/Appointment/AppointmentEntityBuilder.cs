using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Appointment
{
    public class AppointmentEntityBuilder
    {
        private Guid _id;
        private Guid _patientId;
        private Guid? _professionalId;
        private string _specialty = string.Empty;
        private DateTime _scheduledAt;
        private AppointmentStatusEnum _status = AppointmentStatusEnum.Pending;

        public AppointmentEntityBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public AppointmentEntityBuilder WithPatientId(Guid patientId)
        {
            _patientId = patientId;
            return this;
        }

        public AppointmentEntityBuilder WithProfessionalId(Guid? professionalId)
        {
            _professionalId = professionalId;
            return this;
        }

        public AppointmentEntityBuilder WithSpecialty(string specialty)
        {
            _specialty = specialty;
            return this;
        }

        public AppointmentEntityBuilder WithScheduledAt(DateTime scheduledAt)
        {
            _scheduledAt = scheduledAt;
            return this;
        }

        public AppointmentEntityBuilder WithStatus(AppointmentStatusEnum status)
        {
            _status = status;
            return this;
        }

        public AppointmentEntity Build()
        {
            return new AppointmentEntity(
                _id,
                _patientId,
                _professionalId,
                _specialty,
                _scheduledAt,
                _status
            );
        }
    }

}
