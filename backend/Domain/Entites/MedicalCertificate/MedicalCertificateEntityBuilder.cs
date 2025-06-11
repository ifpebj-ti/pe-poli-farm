using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.MedicalCertificate
{
    public class MedicalCertificateEntityBuilder
    {
        private Guid _medicalRecordId;
        private Guid _patientId;
        private Guid _professionalId;
        private DateTime _issueDate;
        private DateTime? _expiryDate;
        private string? _issuedBy;
        private string? _certificateNumber;
        private string? _remarks;
        private string? _description;

        public MedicalCertificateEntityBuilder WithMedicalRecordId(Guid medicalRecordId)
        {
            _medicalRecordId = medicalRecordId;
            return this;
        }

        public MedicalCertificateEntityBuilder WithPatientId(Guid patientId)
        {
            _patientId = patientId;
            return this;
        }

        public MedicalCertificateEntityBuilder WithProfessionalId(Guid professionalId)
        {
            _professionalId = professionalId;
            return this;
        }

        public MedicalCertificateEntityBuilder WithIssueDate(DateTime issueDate)
        {
            _issueDate = issueDate;
            return this;
        }

        public MedicalCertificateEntityBuilder WithExpiryDate(DateTime? expiryDate)
        {
            _expiryDate = expiryDate;
            return this;
        }

        public MedicalCertificateEntityBuilder WithIssuedBy(string? issuedBy)
        {
            _issuedBy = issuedBy;
            return this;
        }

        public MedicalCertificateEntityBuilder WithCertificateNumber()
        {
            _certificateNumber = new Guid().ToString(); //implementar logica de geração de número de certificado
            return this;
        }

        public MedicalCertificateEntityBuilder WithRemarks(string? remarks)
        {
            _remarks = remarks;
            return this;
        }

        public MedicalCertificateEntityBuilder WithDescription(string? description)
        {
            _description = description;
            return this;
        }

        public MedicalCertificateEntity Build()
        {
            return new MedicalCertificateEntity(
                _medicalRecordId,
                _patientId,
                _professionalId,
                _issueDate,
                _expiryDate,
                _issuedBy,
                _certificateNumber,
                _remarks,
                _description
                );
        }
    }
}
