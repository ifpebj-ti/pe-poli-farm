using Domain.Dtos.Prescription;
using FluentValidation;

namespace WebApi.Validators.Prescription
{
    public class CreatePrescriptionValidator : AbstractValidator<CreatePrescriptionDTO>
    {
        public CreatePrescriptionValidator()
        {
            RuleFor(p => p.MedicationName)
                .NotEmpty().WithMessage("O nome do medicamento é obrigatório.");

            RuleFor(p => p.Posology)
                .NotEmpty().WithMessage("A posologia é obrigatória.");

            RuleFor(p => p.Type)
                .NotEmpty().WithMessage("O tipo da prescrição é obrigatório.");
        }
    }
}
