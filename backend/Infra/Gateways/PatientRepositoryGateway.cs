using Application.Gateways;
using Domain.Entites.User;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.Utils;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class PatientRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<PatientEntity>(context), IGatewayPatient
    {
        public async Task Save(PatientEntity patientEntity)
        {
            context.Patients.Add(patientEntity);
            await context.SaveChangesAsync();
        }

        public async Task Update(PatientEntity patientEntity)
        {
            context.Patients.Update(patientEntity);
            await context.SaveChangesAsync();
        }

        public async Task<PagedResult<List<PatientEntity>?>> GetByFilterList(string filter, string status, int pageNumber, int pageSize)
        {
            var totalRecords = await context.Patients.CountAsync();

            var patients = await context.Patients
                .Include(p => p.AddressEntity)
                .Include(p => p.EmergencyContactDetailsEntity)
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(m => m!.Anamnese)
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(mr => mr!.PatientExams.OrderBy(pe => pe.PrescriptionDate))
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(mr => mr!.PatientMedications.OrderBy(pm => pm.PrescriptionDate))
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(mr => mr!.HealthAndDisease)
                .Where(p =>
                    (p.Cpf.Value == filter) ||
                    (p.Sus.Value == filter) ||
                    (p.Status.Value == status) ||
                    (p.ServicesEntity != null &&
                     p.ServicesEntity.Any(s =>
                         s.MedicalRecordEntity != null &&
                         (
                             s.MedicalRecordEntity.Status.Value == status ||
                             (s.MedicalRecordEntity.Anamnese != null &&
                              s.MedicalRecordEntity.Anamnese.ClassificationStatus.Value == status)
                         )
                     )
                    )
                )
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Consulta 2: Buscar os últimos serviços baseados nos IDs dos pacientes
            var lastServices = await context.Services
                .Include(s => s.MedicalRecordEntity).ThenInclude(m => m!.Anamnese)
                .Where(s => patients.Select(p => p.Id).Contains(s.PatientId))
                .GroupBy(s => s.PatientId)
                .Select(g => g.OrderByDescending(s => s.ServiceDate).FirstOrDefault()) // Seleciona o último serviço por paciente
                .ToListAsync();

            patients.ForEach(p =>
            {
                var lastService = lastServices.FirstOrDefault(s => s.PatientId == p.Id);
                p.ServicesEntity = lastService != null
                    ? new List<ServiceEntity> { lastService }
                    : new List<ServiceEntity>();
            });

            return new PagedResult<List<PatientEntity>?>
            {
                Pages = patients,
                TotalRecords = totalRecords
            };
        }

        public async Task<PatientEntity?> GetById(Guid id)
        {
            var patient = await context.Patients
                .Include(p => p.AddressEntity)
                .Include(p => p.EmergencyContactDetailsEntity)
                .FirstOrDefaultAsync(p => p.Id == id);
            return patient;
        }

        public async Task<PatientEntity?> GetByCpf(string cpf)
        {
            var patient = await context.Patients
                .Include(p => p.AddressEntity)
                .Include(p => p.EmergencyContactDetailsEntity)
                .Include(p => p.ServicesEntity)
                .ThenInclude(s => s.MedicalRecordEntity)
                .ThenInclude(mr => mr.PatientMedications)
                .Where(p => p.Cpf.Value == cpf)
                .FirstOrDefaultAsync();
            return patient;
        }

        new public async Task<List<PatientEntity>> GetAllAsync()
        {
            var patients = await context.Patients
                .Include(p => p.AddressEntity)
                .Include(p => p.EmergencyContactDetailsEntity)
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(mr => mr!.Anamnese)
                .Include(p => p.ServicesEntity)
                    !.ThenInclude(s => s.MedicalRecordEntity)
                    .ThenInclude(mr => mr!.HealthAndDisease)
                .ToListAsync();

            return patients;
        }
    }
}
