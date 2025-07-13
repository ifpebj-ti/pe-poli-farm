using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prontuario.Domain.Entities.PatientMedication
{
    public class PatientPrescriptionEntityBuilder
    {
        private Guid _id;
        private DateTime _prescriptionDate;
        private DateTime? _executionDate;
        private string _posology = string.Empty;
        private Guid _medicalRecordId;
        private Guid _professionalId;
        private string _type = string.Empty;
        private string _medicationName = string.Empty;

        public PatientPrescriptionEntityBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithPrescriptionDate(DateTime prescriptionDate)
        {
            _prescriptionDate = prescriptionDate;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithExecutionDate(DateTime? executionDate)
        {
            _executionDate = executionDate;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithDescription(string posology)
        {
            _posology = posology;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithProfessionalId(Guid professionalId)
        {
            _professionalId = professionalId;
            return this;
        }
        public PatientPrescriptionEntityBuilder WithType(string type)
        {
            _type = type;
            return this;
        }

        public PatientPrescriptionEntityBuilder WithMedicationName(string medicationName)
        {
            _medicationName = medicationName;
            return this;
        }

        public PatientPrescriptionEntity Build()
        {
            return new PatientPrescriptionEntity(_id, _prescriptionDate, _executionDate, _posology, _medicalRecordId, _professionalId, _medicationName, _type);
        }
    }
}
