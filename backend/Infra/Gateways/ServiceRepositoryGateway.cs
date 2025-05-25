using Application.Gateways;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Service;
using Domain.Utils;
using Infra.Database;
using Microsoft.EntityFrameworkCore;

namespace Infra.Gateways;

public class ServiceRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<ServiceEntity>(context), IServiceGateway
{
    public async Task Init(ServiceEntity serviceEntity)
    {
        context.Update(serviceEntity);
        await context.SaveChangesAsync();
    }

    public async Task<ServiceEntity?> FindById(Guid serviceId)
    {
        var service = await context.Services
            .Include(s => s.PatientEntity).ThenInclude(s => s.AddressEntity)
            .Include(s => s.PatientEntity).ThenInclude(s => s.EmergencyContactDetailsEntity)
            .Include(s =>  s.MedicalRecordEntity).ThenInclude(m => m!.Anamnese)
            .FirstOrDefaultAsync(s => s.Id == serviceId);
        return service;
    }

    public async Task<PagedResult<List<ServiceEntity>?>> FindAllByPatientId(Guid patientId, int pageNumber, int pageSize)
    {
        var totalRecords = await context.Patients.Where(s => s.Id == patientId).CountAsync();
        
        var services = await context.Services
            .Include(s => s.MedicalRecordEntity).ThenInclude(m => m!.Anamnese)
            .Where(s => s.PatientId == patientId && s.ServiceStatus != null)
            .OrderBy(s => s.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<List<ServiceEntity>?>()
        {
            Pages = services,
            TotalRecords = totalRecords
        };
    }

    public async Task InitScreening(MedicalRecordEntity medicalRecordEntity, Guid serviceEntity)
    {
        context.Update(medicalRecordEntity);
        await context.SaveChangesAsync();
    }
}