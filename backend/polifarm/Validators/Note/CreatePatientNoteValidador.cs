using Domain.Dtos.Note;
using Domain.Dtos.Patient;
using FluentValidation;

namespace WebApi.Validators.Note
{
    public class CreatePatientNoteValidador : AbstractValidator<CreateNotesDTO>
    {
        public CreatePatientNoteValidador()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Titulo é obrigatório")
                .MinimumLength(2).WithMessage("Titulo deve ter pelo menos 2 caracteres");

        }
    }
}
