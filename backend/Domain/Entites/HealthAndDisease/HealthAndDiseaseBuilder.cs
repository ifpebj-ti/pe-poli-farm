using Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.HealthAndDisease
{
    public class HealthAndDiseaseBuilder
    {
        private bool _familyHAS;
        private bool _familyDM;
        private bool _familyIAM;
        private bool _familyAVC;
        private bool _familyAlzheimer;
        private bool _familyCA;

        private bool _ownHAS;
        private bool _ownDM;
        private bool _ownIAM;
        private bool _ownAVC;
        private bool _ownAlzheimer;
        private bool _ownCA;

        private Guid _medicalRecordId;

        public HealthAndDiseaseBuilder WithFamilyHAS(bool value) { _familyHAS = value; return this; }
        public HealthAndDiseaseBuilder WithFamilyDM(bool value) { _familyDM = value; return this; }
        public HealthAndDiseaseBuilder WithFamilyIAM(bool value) { _familyIAM = value; return this; }
        public HealthAndDiseaseBuilder WithFamilyAVC(bool value) { _familyAVC = value; return this; }
        public HealthAndDiseaseBuilder WithFamilyAlzheimer(bool value) { _familyAlzheimer = value; return this; }
        public HealthAndDiseaseBuilder WithFamilyCA(bool value) { _familyCA = value; return this; }

        public HealthAndDiseaseBuilder WithOwnHAS(bool value) { _ownHAS = value; return this; }
        public HealthAndDiseaseBuilder WithOwnDM(bool value) { _ownDM = value; return this; }
        public HealthAndDiseaseBuilder WithOwnIAM(bool value) { _ownIAM = value; return this; }
        public HealthAndDiseaseBuilder WithOwnAVC(bool value) { _ownAVC = value; return this; }
        public HealthAndDiseaseBuilder WithOwnAlzheimer(bool value) { _ownAlzheimer = value; return this; }
        public HealthAndDiseaseBuilder WithOwnCA(bool value) { _ownCA = value; return this; }

        public HealthAndDiseaseBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public HealthAndDiseaseEntity Build()
        {
            return new HealthAndDiseaseEntity(
                _familyHAS, _familyDM, _familyIAM, _familyAVC, _familyAlzheimer, _familyCA,
                _ownHAS, _ownDM, _ownIAM, _ownAVC, _ownAlzheimer, _ownCA,
                _medicalRecordId
            );
        }
    }

}
