using Domain.Entites.MedicalCertificate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class MedicalCertificateConfiguration : IEntityTypeConfiguration<MedicalCertificateEntity>
    {
        public void Configure(EntityTypeBuilder<MedicalCertificateEntity> builder)
        {
            builder.ToTable("MedicalCertificates");

            builder.HasKey(mc => mc.Id);

            builder.Property(mc => mc.IssueDate)
                .IsRequired();

            builder.Property(mc => mc.Descriprition)
                .IsRequired()
                .HasMaxLength(500);

            builder.HasOne(mc => mc.Patient)
                .WithMany() // Se o paciente tiver lista de certificados médicos, coloque .WithMany(p => p.MedicalCertificates)
                .HasForeignKey(mc => mc.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(mc => mc.Professional)
                .WithMany() // Se o profissional tiver lista de certificados médicos, coloque .WithMany(p => p.MedicalCertificates)
                .HasForeignKey(mc => mc.ProfessionalId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(mc => mc.MedicalRecord)
                .WithMany() // Se o prontuário médico tiver lista de certificados médicos, coloque .WithMany(mr => mr.MedicalCertificates)
                .HasForeignKey(mc => mc.MedicalRecordId)
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
