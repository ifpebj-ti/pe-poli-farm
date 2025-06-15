namespace WebApi.ResponseModels.PatientMedications
{
    public class PatientPrescriptionResponseBuilder
    {
        private Guid _id;
        private DateTime _prescriptionDate;
        private DateTime? _executionDate;
        private string? _description;
        private string? _type;
        private string? _name;

        public PatientPrescriptionResponseBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public PatientPrescriptionResponseBuilder WithPrescriptionDate(DateTime prescriptionDate)
        {
            _prescriptionDate = prescriptionDate;
            return this;
        }

        public PatientPrescriptionResponseBuilder WithExecutionDate(DateTime? executionDate)
        {
            _executionDate = executionDate;
            return this;
        }

        public PatientPrescriptionResponseBuilder WithDescription(string? description)
        {
            _description = description;
            return this;
        }

        public PatientPrescriptionResponseBuilder WithType(string? type)
        {
            _type = type;
            return this;
        }
        public PatientPrescriptionResponseBuilder WithName(string? name)
        {
            _name = name;
            return this;
        }

        public PatientPrescriptionResponse Build()
        {
            return new PatientPrescriptionResponse(
                _id,
                _prescriptionDate,
                _executionDate,
                _description,
                _type,
                _name
            );
        }
    }
}
