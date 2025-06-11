using Domain.Dtos.MedicalCertificate;
using FluentValidation;

namespace WebApi.Validators.MedicalCertificate
{
    public class CreateMedicalCertificateValidator : AbstractValidator<CreateCertificateDTO>
    {
        public CreateMedicalCertificateValidator()
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("O ID do paciente é obrigatório.");

            RuleFor(x => x.ProfessionalId)
                .NotEmpty().WithMessage("O ID do profissional é obrigatório.");

            RuleFor(x => x.MedicalRecordId)
                .NotEmpty().WithMessage("O ID do prontuário médico é obrigatório.");

            RuleFor(x => x.Description)
                .Empty().WithMessage("A descrição é obrigatória.")
                .MaximumLength(500).WithMessage("A descrição não pode exceder 500 caracteres.");
        }
    }
}
