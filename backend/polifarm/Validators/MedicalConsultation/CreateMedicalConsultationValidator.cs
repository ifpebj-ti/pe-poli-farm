using Domain.Dtos.MedicalConsultation;
using FluentValidation;
using WebApi.Validators.Anamnese;
using WebApi.Validators.Note;
using WebApi.Validators.PatientExam;
using WebApi.Validators.Prescription;

namespace WebApi.Validators.MedicalConsultation
{
    public class CreateMedicalConsultationValidator : AbstractValidator<CreateMedicalConsultationDTO>
    {
        public CreateMedicalConsultationValidator()
        {
            RuleFor(c => c.PatientId)
                .NotEmpty().WithMessage("O ID do paciente é obrigatório.");

            RuleFor(c => c.ProfessionalId)
                .NotEmpty().WithMessage("O ID do profissional é obrigatório.");

            RuleFor(c => c.Anamnese)
                .NotNull().WithMessage("Os dados de anamnese são obrigatórios.")
                .SetValidator(new CreateAnamneseValidator()); // Usa o validador da anamnese

            RuleFor(c => c.HealthHistory)
                .NotNull().WithMessage("O histórico de saúde é obrigatório.");

            // Valida cada item na lista de prescrições, se a lista existir
            RuleForEach(c => c.Prescriptions)
                .SetValidator(new CreatePrescriptionValidator())
                .When(c => c.Prescriptions != null && c.Prescriptions.Any());

            // Valida cada item na lista de exames, se a lista existir
            RuleForEach(c => c.PatientExams)
                .SetValidator(new CreatepatientExamValidator())
                .When(c => c.PatientExams != null && c.PatientExams.Any());
        }
    }

}
