using FluentValidation;
using Domain.Dtos.User;

namespace prontuario.WebApi.Validators.User;

public class UpdatePasswordUserValidator : AbstractValidator<UpdateUserPasswordDTO>
{
    public UpdatePasswordUserValidator()
    {
        RuleFor(x => x.Email)
            .NotNull().WithMessage("O campo Email não pode ser nulo.")
            .NotEmpty().WithMessage("O campo Email é obrigatório.")
            .EmailAddress().WithMessage("O campo Email deve conter um endereço de e-mail válido.");
        
        RuleFor(x => x.Password)
            .NotNull().WithMessage("O campo Password não pode ser nulo.")
            .NotEmpty().WithMessage("O campo Password é obrigatório.")
            .MinimumLength(6).WithMessage("O campo Password deve ter no mínimo 6 caracteres.")
            .MaximumLength(50).WithMessage("O campo Password deve ter no máximo 50 caracteres.");

        RuleFor(x => x.AccessCode)
            .NotNull().WithMessage("O campo Email não pode ser nulo.")
            .NotEmpty().WithMessage("O campo Email é obrigatório.");
    }
    
}