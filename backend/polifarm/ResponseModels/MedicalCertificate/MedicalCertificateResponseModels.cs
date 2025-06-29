using Domain.Entites.MedicalCertificate;

namespace WebApi.ResponseModels.MedicalCertificate
{
    public class MedicalCertificateResponseModels
    {
        public static MedicalCertificateResponse ToResponse(MedicalCertificateEntity certificate)
        {
            return new MedicalCertificateResponse(
                certificate.PatientId,
                certificate.ProfessionalId,
                certificate.MedicalRecordId,
                certificate.Patient.Name,
                certificate.Professional.Name,
                certificate.IssueDate,
                certificate.ExpiryDate,
                certificate.Descriprition,
                certificate.Remarks
            );
        }

        public static List<MedicalCertificateResponse> ToResponseList(List<MedicalCertificateEntity> certificates)
        {
            return certificates.Select(ToResponse).ToList();
        }
    }
}
