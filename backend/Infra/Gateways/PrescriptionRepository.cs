using Application.Gateways;
using Domain.Entites.User;
using Infra.Database;
using prontuario.Domain.Entities.PatientMedication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class PrescriptionRepository(PolifarmDbContext context) : GenericRepositoryGateway<PatientPrescriptionEntity>(context), IPrescriptionRepository
    {
        public async Task Create(PatientPrescriptionEntity prescriptionEntity)
        {
            context.Prescriptions.Add(prescriptionEntity);
            await context.SaveChangesAsync();
        }
    }
}
