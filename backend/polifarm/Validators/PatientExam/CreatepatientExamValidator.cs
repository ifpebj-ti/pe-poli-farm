using Domain.Dtos.PatientExams;
using FluentValidation;

namespace WebApi.Validators.PatientExam
{
    public class CreatepatientExamValidator : AbstractValidator<CreatePatientExamDTO>
    {
        public CreatepatientExamValidator()
        {
            RuleFor(e => e.Name)
                .NotEmpty().WithMessage("O nome do exame é obrigatório.");

            RuleFor(e => e.Description)
                .NotEmpty().WithMessage("A descrição do exame é obrigatória.");
        }
    }
}
