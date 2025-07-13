using Domain.Dtos.PatientExams;
using Domain.Entities.PatientExams;
using Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class PatientExamsFactory
    {
        public static PatientExamsEntity Create(CreatePatientExamDTO dto, Guid medicalRecordId, Guid professionalId)
        {
            return new PatientExamsEntityBuilder()
                .WithId(Guid.NewGuid())
                .WithName(dto.Name)
                .WithDescription(dto.Description)
                .WithPrescriptionDate(dto.PrescriptionDate)
                .WithPriority(new ExamPriorityStatus(dto.Priority))
                .WithExecutionDate(null)
                .WithMedicalRecordId(medicalRecordId)
                .WithProfessionalId(professionalId)
                .Build();
        }
    }
}
