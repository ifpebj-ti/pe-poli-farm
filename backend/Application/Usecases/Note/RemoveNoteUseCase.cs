using Application.Gateways;
using Domain.Entities.Notes;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Note
{
    public class RemoveNoteUseCase(INotesRepositoryGateway noteRepositopry)
    {
        public async Task<ResultPattern<string>> Execute(Guid noteId)
        {
            try
            {
                var note = await noteRepositopry.GetByIdAsync(noteId);
                if (note == null)
                {
                    return ResultPattern<string>.NotFound("Nota não encontrada.");
                }

                await noteRepositopry.DeleteAsync(note.Id);
                return ResultPattern<string>.SuccessResult("Nota removida com sucesso.");
            }
            catch (Exception)
            {
                return ResultPattern<string>.FailureResult("Erro interno", 500);
            }
        }
    }
}
