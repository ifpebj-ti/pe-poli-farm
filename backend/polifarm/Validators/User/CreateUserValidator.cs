using FluentValidation;
using Domain.Dtos.User;

namespace prontuario.WebApi.Validators.User
{
    public class CreateUserValidator : AbstractValidator<CreateUserDTO>
    {
        public CreateUserValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MinimumLength(2).WithMessage("Nome deve ter pelo menos 2 caracteres");

            RuleFor(x => x.Email)
                .NotNull().WithMessage("O campo Email não pode ser nulo.")
                .NotEmpty().WithMessage("O campo Email é obrigatório.")
                .EmailAddress().WithMessage("O campo Email deve conter um endereço de e-mail válido.");

            RuleFor(x => x.Cpf)
                .NotEmpty().WithMessage("CPF é obrigatório");

            RuleFor(x => x.Position)
                .NotEmpty().WithMessage("Cargo é obrigatório")
                .Must(position => position == "RECEPCTION" || position == "MANAGEMENT" || position == "DOCTOR" || position == "NURSE" || position == "NURSING_TECHNICIAN" 
                                || position == "PHYSIOTHERAPIST" || position == "PSYCHOLOGIST" || position == "NUTRITIONIST" || position == "PHARMACEUTICAL" 
                                || position == "OCCUPATIONAL_THERAPIST" || position == "BIOCHEMICAL" || position == "X_RAY_TECHNICIAN" || position == "LABORATORY_TECHNICIAN")
                .WithMessage("O campo Position deve ser RECEPCTION, MANAGEMENT, DOCTOR, NURSE, NURSING_TECHNICIAN, PHYSIOTHERAPIST, PSYCHOLOGIST, NUTRITIONIST, PHARMACEUTICAL, " +
                            "OCCUPATIONAL_THERAPIST, BIOCHEMICAL, X_RAY_TECHNICIAN ou LABORATORY_TECHNICIAN");

            RuleFor(x => x.Profile.Role)
                .NotNull().WithMessage("O campo Role não pode ser nulo.")
                .NotEmpty().WithMessage("O campo Role é obrigatório.")
                .Must(role => role == "ADMIN" || role == "RECEPTIONTEAM" || role == "DOCTOR" || role == "NURSE" || role == "INTITUATIONMANAGEMENT")
                .WithMessage("O campo Role deve ser ADMIN, RECEPTIONTEAM, DOCTOR, NURSE ou INTITUATIONMANAGEMENT");
        }
    }
}
