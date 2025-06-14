using Application.Gateways;
using Domain.Dtos;
using Domain.Entities.Notes;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Note
{
    public class GetNotesUseCase(INotesRepositoryGateway notesRepository)
    {
        private readonly INotesRepositoryGateway _notesRepository = notesRepository;

        public async Task<ResultPattern<List<NotesEntity>>> Execute(NotesFilterDTO filters, CancellationToken cancellationToken = default)
        {
            try
            {
                var notes = await _notesRepository.GetWithFiltersAsync(filters, cancellationToken);
                return ResultPattern<List<NotesEntity>>.SuccessResult(notes);
            }
            catch (Exception)
            {
                return ResultPattern<List<NotesEntity>>.FailureResult("Erro interno", 500);
            }
        }   
    }
}
