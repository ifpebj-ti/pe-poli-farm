using Domain.Dtos.Anamnese;
using FluentValidation;

namespace WebApi.Validators.Anamnese
{
    public class CreateAnamneseValidator : AbstractValidator<CreateAnamneseDTO>
    {
        public CreateAnamneseValidator()
        {
            RuleFor(a => a.SignsAndSymptoms)
                .NotEmpty().WithMessage("Sinais e sintomas são obrigatórios na anamnese.");

            RuleFor(a => a.MedicalHypothesis)
                .NotEmpty().WithMessage("A hipótese médica é obrigatória na anamnese.");
        }
    }
}
