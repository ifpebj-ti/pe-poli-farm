using Domain.Dtos.Referral;
using FluentValidation;

namespace WebApi.Validators.Referral
{
    public class CreateReferralValidator : AbstractValidator<CreateReferralDTO>
    {
        public CreateReferralValidator()
        {
            RuleFor(x => x.MedicalRecordId)
                .NotEmpty().WithMessage("O ID do prontuário é obrigatório.");

            RuleFor(x => x.ProfessionalId)
                .NotEmpty().WithMessage("O ID do profissional é obrigatório.");

            RuleFor(x => x.Reason)
                .NotEmpty().WithMessage("O motivo da referência é obrigatório.")
                .MaximumLength(500).WithMessage("O motivo da referência não pode exceder 500 caracteres.");

            RuleFor(x => x.ExpectedDuration)
                .NotEmpty().WithMessage("A duração esperada é obrigatória.");
        }
    }
}
