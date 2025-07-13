using Domain.Dtos.MedicalCertificate;
using Domain.Entites.MedicalCertificate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class MedicalCertificateFactory
    {
        public static MedicalCertificateEntity Create(CreateCertificateDTO dto)
        {
            return new MedicalCertificateEntityBuilder()
                .WithIssueDate(dto.IssueDate)
                .WithExpiryDate(dto.ExpiryDate)
                .WithIssuedBy(dto.IssuedBy)
                .WithCertificateNumber()
                .WithRemarks(dto.Remarks)
                .WithDescription(dto.Description)
                .WithMedicalRecordId(dto.MedicalRecordId)
                .WithPatientId(dto.PatientId)
                .WithProfessionalId(dto.ProfessionalId)
                .Build();
        }
    }
}
