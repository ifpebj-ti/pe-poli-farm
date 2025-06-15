using Domain.Dtos;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using Domain.Entities.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface INotesRepositoryGateway : IGenericRepositoryGateway<NotesEntity>
    {
        Task<List<NotesEntity>> GetWithFiltersAsync(NotesFilterDTO filters, CancellationToken cancellationToken = default);
    }
}
