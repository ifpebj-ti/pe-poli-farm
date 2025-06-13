using Domain.Dtos.Note;
using Domain.Entities.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class NotesFactory
    {
        public static NotesEntity CreateNotes(CreateNotesDTO data)
        {
            return new NotesEntityBuilder()
                .WithDescription(data.Title)
                .WithCreatedAt(data.CreatedAt)
                .WithProfessionalId(data.ProfessionalId)
                .WithPatientId(data.PatientId)
                .Build();
        }
    }
}
