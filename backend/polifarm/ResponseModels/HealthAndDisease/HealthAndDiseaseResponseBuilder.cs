namespace WebApi.ResponseModels.HealthAndDisease
{
    public class HealthAndDiseaseResponseBuilder
    {
        private Guid _id;
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

        public HealthAndDiseaseResponseBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyHAS(bool value)
        {
            _familyHAS = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyDM(bool value)
        {
            _familyDM = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyIAM(bool value)
        {
            _familyIAM = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyAVC(bool value)
        {
            _familyAVC = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyAlzheimer(bool value)
        {
            _familyAlzheimer = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithFamilyCA(bool value)
        {
            _familyCA = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnHAS(bool value)
        {
            _ownHAS = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnDM(bool value)
        {
            _ownDM = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnIAM(bool value)
        {
            _ownIAM = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnAVC(bool value)
        {
            _ownAVC = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnAlzheimer(bool value)
        {
            _ownAlzheimer = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithOwnCA(bool value)
        {
            _ownCA = value;
            return this;
        }

        public HealthAndDiseaseResponseBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public HealthAndDiseaseResponse Build()
        {
            return new HealthAndDiseaseResponse(
                _id,
                _familyHAS,
                _familyDM,
                _familyIAM,
                _familyAVC,
                _familyAlzheimer,
                _familyCA,
                _ownHAS,
                _ownDM,
                _ownIAM,
                _ownAVC,
                _ownAlzheimer,
                _ownCA,
                _medicalRecordId
            );
        }
    }

}
