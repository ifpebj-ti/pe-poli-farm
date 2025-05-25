namespace WebApi.ResponseModels.PatientMedications
{
    public class PatientMedicationResponseBuilder
    {
        private Guid _id;
        private DateTime _prescriptionDate;
        private DateTime? _executionDate;
        private string? _description;

        public PatientMedicationResponseBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public PatientMedicationResponseBuilder WithPrescriptionDate(DateTime prescriptionDate)
        {
            _prescriptionDate = prescriptionDate;
            return this;
        }

        public PatientMedicationResponseBuilder WithExecutionDate(DateTime? executionDate)
        {
            _executionDate = executionDate;
            return this;
        }

        public PatientMedicationResponseBuilder WithDescription(string? description)
        {
            _description = description;
            return this;
        }

        public PatientMedicationResponse Build()
        {
            return new PatientMedicationResponse(
                _id,
                _prescriptionDate,
                _executionDate,
                _description
            );
        }
    }
}
