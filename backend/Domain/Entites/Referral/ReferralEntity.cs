using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Referral
{
    public class ReferralEntity : BaseEntity
    {
        public MedicalRecordEntity MedicalRecord { get; set; }
        public Guid MedicalRecordId { get; private set; }
        public UserEntity Professional { get; set; }
        public Guid ProfessionalId { get; set; }
        public string Reason { get; set; }
        public string ExpectedDuration { get; set; }

        public ReferralEntity()
        { }

        public ReferralEntity(Guid medicalRecordId, Guid professionalId, string reason, string expectedDuration)
        {
            if(string.IsNullOrWhiteSpace(expectedDuration))
                throw new DomainException("Um encaminhamento precisa ter uma expectativa de duração");

            MedicalRecordId = medicalRecordId;
            ProfessionalId = professionalId;
            Reason = reason;
            ExpectedDuration = expectedDuration;
        }
    }
}
