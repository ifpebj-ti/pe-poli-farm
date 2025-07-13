using Application.Gateways;
using Domain.Dtos;
using Domain.Entities.Notes;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class NotesRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<NotesEntity>(context), INotesRepositoryGateway
    {
        public async Task<List<NotesEntity>> GetWithFiltersAsync(NotesFilterDTO filters, CancellationToken cancellationToken = default)
        {
            var query = context.Notes.Include(n => n.Patient).Include(n => n.User).AsQueryable();

            if (filters.PatientId.HasValue)
                query = query.Where(x => x.PatientId == filters.PatientId.Value);

            if (filters.ProfessionalId.HasValue)
                query = query.Where(x => x.UserId == filters.ProfessionalId.Value);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
