using Domain.Dtos.Anamnese;
using Domain.Dtos.HealthAndDisease;
using Domain.Dtos.PatientExams;
using Domain.Dtos.Prescription;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.MedicalConsultation
{
    public record CreateMedicalConsultationDTO(
        Guid PatientId,
        Guid? ProfessionalId,
        CreateAnamneseDTO Anamnese,
        CreateHealthAndDiseaseDTO HealthHistory,
        List<CreatePrescriptionDTO>? Prescriptions = null,
        List<CreatePatientExamDTO>? PatientExams = null
    );
}
