using Domain.Entites.Profile;
using Domain.Entities.Patient;
using Domain.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IGatewayPatient : IGenericRepositoryGateway<PatientEntity>
    {
        Task Save(PatientEntity patientEntity);
        Task Update(PatientEntity patientEntity);
        Task<PagedResult<List<PatientEntity>?>> GetByFilterList(string filter, string status, int pageNumber, int pageSize);
        Task<PatientEntity?> GetById(Guid id);
        Task<PatientEntity?> GetByCpf(string cpf);
    }
}
