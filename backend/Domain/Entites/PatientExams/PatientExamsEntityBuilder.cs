using Domain.Entities.MedicalRecord;
using Domain.ValuesObjects;

namespace Domain.Entities.PatientExams
{
    public class PatientExamsEntityBuilder
    {
        private Guid _id;
        private DateTime _prescriptionDate;
        private DateTime? _executionDate;
        private string _description = string.Empty;
        private Guid _medicalRecordId;
        private Guid _professionalId;
        private string _name = string.Empty;
        private ExamPriorityStatus _priority = new ExamPriorityStatus("NORMAL");

        public PatientExamsEntityBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public PatientExamsEntityBuilder WithPrescriptionDate(DateTime prescriptionDate)
        {
            _prescriptionDate = prescriptionDate;
            return this;
        }

        public PatientExamsEntityBuilder WithExecutionDate(DateTime? executionDate)
        {
            _executionDate = executionDate;
            return this;
        }

        public PatientExamsEntityBuilder WithDescription(string description)
        {
            _description = description;
            return this;
        }

        public PatientExamsEntityBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public PatientExamsEntityBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public PatientExamsEntityBuilder WithPriority(ExamPriorityStatus priority)
        {
            _priority = priority;
            return this;
        }

        public PatientExamsEntityBuilder WithProfessionalId(Guid professionalId)
        {
            _professionalId = professionalId;
            return this;
        }


        public PatientExamsEntity Build()
        {
            return new PatientExamsEntity(_id, _prescriptionDate, _executionDate, _name, _description, _priority, _medicalRecordId, _professionalId);
        }
    }

}
