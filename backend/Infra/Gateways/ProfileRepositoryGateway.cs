using Application.Gateways;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class ProfileRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<ProfileEntity>(context), IProfileRepositoryGateway
    {
        public async Task<List<ProfileEntity>> FindAll()
        {
            var profiles = await context.Profiles.ToListAsync();
            return profiles;
        }
    }
}
