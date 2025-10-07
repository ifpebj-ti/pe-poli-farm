using Domain.Dtos.User;
using FluentValidation;

namespace WebApi.Validators.User
{
    public class UpdateUserDTOValidator : AbstractValidator<UpdateUserDTO>
    {
        public UpdateUserDTOValidator()
        {
            RuleFor(x => x.profileId)
                .NotEmpty().WithMessage("O Id do profile é obrigatório.");

            RuleFor(x => x.name)
                .MaximumLength(200)
                .When(x => !string.IsNullOrWhiteSpace(x.name))
                .WithMessage("O nome deve ter no máximo 200 caracteres.");

            RuleFor(x => x.email)
                .EmailAddress()
                .When(x => !string.IsNullOrWhiteSpace(x.email))
                .WithMessage("Email inválido.");

            RuleFor(x => x.password)
                .MinimumLength(6)
                .When(x => !string.IsNullOrWhiteSpace(x.password))
                .WithMessage("A senha deve ter no mínimo 6 caracteres.");

            RuleFor(x => x.profileId)
                .NotEmpty()
                .When(x => x.profileId.HasValue)
                .WithMessage("O perfil informado é inválido.");
        }
    }
}
