using Domain.Entites.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IProfileRepositoryGateway : IGenericRepositoryGateway<ProfileEntity>
    {
        Task<List<ProfileEntity>> FindAll();
    }
}
