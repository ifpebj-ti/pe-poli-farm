using Domain.Entites;
using Domain.Entites.AccessCode;
using Domain.Entites.Appointment;
using Domain.Entites.Conduct;
using Domain.Entites.MedicalCertificate;
using Domain.Entites.Profile;
using Domain.Entites.Referral;
using Domain.Entites.User;
using Domain.Entities.Anamnese;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Notes;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using Infra.Database.Mappings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using prontuario.Domain.Entities.PatientMedication;
using prontuario.Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using ValuesObjects;

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
        public DbSet<AppointmentEntity> Appointments { get; private set; }
        public DbSet<NotesEntity> Notes { get; private set; }
        public DbSet<MedicalCertificateEntity> MedicalCertificates { get; private set; }
        public DbSet<ReferralEntity> Referrals { get; private set; }
        public DbSet<MedicalRecordEntity> MedicalRecords { get; private set; }
        public DbSet<AnamneseEntity> Anamnesis { get; private set; }
        public DbSet<ConductEntity> Conducts { get; private set; }


        public PolifarmDbContext(DbContextOptions<PolifarmDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());
            
            modelBuilder.Owned<CEP>();
            modelBuilder.Owned<CPF>();
            modelBuilder.Owned<Email>();
            modelBuilder.Owned<ClassificationStatus>();
            modelBuilder.Owned<ExamPriorityStatus>();
            modelBuilder.Owned<MedicalRecordStatus>();
            modelBuilder.Owned<PatientStatus>();
            modelBuilder.Owned<Permissions>();
            modelBuilder.Owned<Phone>();
            modelBuilder.Owned<Positions>();
            modelBuilder.Owned<Relationship>();
            modelBuilder.Owned<RG>();
            modelBuilder.Owned<Role>();
            modelBuilder.Owned<ServiceStatus>();
            modelBuilder.Owned<SUS>();

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties().Where(p => p.ClrType == typeof(DateTime) || p.ClrType == typeof(DateTime?)))
                {
                    property.SetValueConverter(new ValueConverter<DateTime, DateTime>(
                        v => v.ToUniversalTime(),
                        v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                    ));
                }
            }
        }
    }
}
