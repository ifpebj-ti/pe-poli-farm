using Domain.Entities.MedicalRecord;
using Domain.Entities.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IMedicalRecordGateway : IGenericRepositoryGateway<MedicalRecordEntity>
    {
        Task<List<MedicalRecordEntity>> GetByPatientCpf(string cpf);
    }
}
