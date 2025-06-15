using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Referral
{
    public class ReferralEntityBuilder
    {
        private Guid _medicalRecordId;
        private Guid _professionalId;
        private string _reason;
        private string _expectedDuration;

        public ReferralEntityBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public ReferralEntityBuilder WithProfessionalId(Guid professionalId)
        {
            _professionalId = professionalId;
            return this;
        }

        public ReferralEntityBuilder WithReason(string reason)
        {
            _reason = reason;
            return this;
        }

        public ReferralEntityBuilder WithExpectedDuration(string expectedDuration)
        {
            _expectedDuration = expectedDuration;
            return this;
        }

        public ReferralEntity Build()
        {
            return new ReferralEntity(_medicalRecordId, _professionalId, _reason, _expectedDuration);
        }
    }
}
