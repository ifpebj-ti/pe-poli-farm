using Domain.Entites.User;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.MedicalCertificate
{
    public class MedicalCertificateEntity : BaseEntity
    {
        public MedicalRecordEntity MedicalRecord { get; private set; }
        public Guid MedicalRecordId { get; private set; }
        public PatientEntity Patient { get; private set; }
        public Guid PatientId { get; private set; }
        public UserEntity Professional { get; private set; }
        public Guid ProfessionalId { get; private set; }
        public DateTime IssueDate { get; private set; }
        public DateTime? ExpiryDate { get; private set; }
        public string? IssuedBy { get; private set; }
        public string? CertificateNumber { get; private set; }
        public string? Remarks { get; private set; }
        public string? Descriprition { get; private set; }

        public MedicalCertificateEntity() { }

        public MedicalCertificateEntity(
            Guid medicalRecordId,
            Guid patientId,
            Guid professionalId,
            DateTime issueDate,
            DateTime? expiryDate = null,
            string? issuedBy = null,
            string? certificateNumber = null,       
            string? remarks = null,
            string? description = null
        )
        {
            if (expiryDate <= issueDate)
                throw new DomainException("A data de expiração deve ser maior que a data de emição");

            MedicalRecordId = medicalRecordId;
            PatientId = patientId;
            ProfessionalId = professionalId;
            IssueDate = issueDate;
            ExpiryDate = expiryDate;
            IssuedBy = issuedBy;
            CertificateNumber = certificateNumber;
            Remarks = remarks;
            Descriprition = description;
        }
    }
}
