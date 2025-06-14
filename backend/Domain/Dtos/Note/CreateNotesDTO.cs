using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Note
{
    public record CreateNotesDTO
    (
        string Title,
        DateTime CreatedAt,
        Guid ProfessionalId,
        Guid PatientId
    );
}
