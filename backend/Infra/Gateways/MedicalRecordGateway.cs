using Application.Gateways;
using Domain.Entites.MedicalCertificate;
using Domain.Entities.MedicalRecord;
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
    public class MedicalRecordGateway(PolifarmDbContext context) : GenericRepositoryGateway<MedicalRecordEntity>(context), IMedicalRecordGateway
    {
        public async Task<List<MedicalRecordEntity>> GetByPatientCpf(string cpf)
        {
            return await context.MedicalRecords
                .Include(mr => mr.Anamnese)
                .Include(mr => mr.PatientExams)
                    .ThenInclude(pe => pe.Professional)
                .Include(mr => mr.PatientMedications)
                    .ThenInclude(pm => pm.Professional)
                    .Include(mr => mr.HealthAndDisease)
                    .Include(mr => mr.Service)
                .Where(mr => mr.Service.PatientEntity.Cpf.Value == cpf)
                .ToListAsync();
        }
    }
}
