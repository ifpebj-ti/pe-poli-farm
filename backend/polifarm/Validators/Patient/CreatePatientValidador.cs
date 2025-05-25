using Domain.Dtos.Patient;
using FluentValidation;

namespace WebApi.Validators.Patient
{
    public class CreatePatientValidador : AbstractValidator<CreatePatientDTO>
    {
        public CreatePatientValidador()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MinimumLength(2).WithMessage("Nome deve ter pelo menos 2 caracteres");

            RuleFor(x => x.Cpf)
                .NotEmpty().WithMessage("CPF é obrigatório")
                .MinimumLength(14).WithMessage("CPF inválido. Deve estar no formato 000.000.000-00.")
                .MaximumLength(14).WithMessage("CPF inválido. Deve estar no formato 000.000.000-00.");
        }
    }
}
