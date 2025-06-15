using Domain.Entities.Notes;

namespace WebApi.ResponseModels.Note
{
    public class NoteResponseModels
    {
        public static NoteResponse CreateNoteResponse(NotesEntity note)
        {
            return new NoteResponse
            (
                note.Id,
                note.Description,
                note.CreatedAt,
                note.Patient.Name,
                note.User.Name
            );
        }

        public static List<NoteResponse> CreateNoteResponseList(List<NotesEntity> notes)
        {
            return notes.Select(note => CreateNoteResponse(note)).ToList();
        }
    }
}
