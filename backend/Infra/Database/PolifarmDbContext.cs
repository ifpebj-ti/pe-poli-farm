using Domain.Entites;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Microsoft.EntityFrameworkCore;
using prontuario.Domain.Entities.PatientMedication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database
{
    public class PolifarmDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; private set; }
        public DbSet<ProfileEntity> Profiles { get; private set; }
        public DbSet<AccessCodeEntity> AccessCodes { get; private set; }
        public DbSet<PatientEntity> Patients { get; private set; }
        public DbSet<ServiceEntity> Services { get; private set; }
        public DbSet<PatientPrescriptionEntity> Prescriptions { get; private set; }


        public PolifarmDbContext(DbContextOptions<PolifarmDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PolifarmDbContext).Assembly);
        }
    }
}
