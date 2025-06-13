using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Note;
using Domain.Entities.Notes;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Note
{
    public class AddNoteUseCase(INotesRepositoryGateway noteRepositopry)
    {
        public async Task<ResultPattern<string>> Execute(CreateNotesDTO note)
        {
            try
            {
                var newNote = NotesFactory.CreateNotes(note);
                await noteRepositopry.AddAsync(newNote);
                return ResultPattern<string>.SuccessResult("Note adicionada com sucesso.");
            }
            catch (DomainException dex)
            {
                return ResultPattern<string>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<string>.FailureResult("Erro interno", 500);
            }
        }
    }
}
