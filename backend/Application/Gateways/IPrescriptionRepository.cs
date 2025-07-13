using Domain.Entites.User;
using prontuario.Domain.Entities.PatientMedication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IPrescriptionRepository : IGenericRepositoryGateway<PatientPrescriptionEntity>
    {
        Task Create(PatientPrescriptionEntity userEntity);
    }
}
