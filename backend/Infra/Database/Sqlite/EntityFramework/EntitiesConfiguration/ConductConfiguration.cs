using Domain.Entites.Conduct;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class ConductConfiguration : IEntityTypeConfiguration<ConductEntity>
    {
        public void Configure(EntityTypeBuilder<ConductEntity> builder)
        {
            builder.ToTable("Conducts");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.ProcedureType)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(c => c.MedicationsInUse)
                .HasMaxLength(500);
           
            builder.Property(c => c.ConductDescription)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(c => c.CreatedAt)
                .IsRequired();

            builder.HasOne(c => c.Patient)
                .WithMany()
                .HasForeignKey(c => c.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento com Profissional (UserEntity)
            builder.HasOne(c => c.Professional)
                .WithMany()
                .HasForeignKey(c => c.ProfessionalId)
                .OnDelete(DeleteBehavior.Restrict);

            // NOVO RELACIONAMENTO com MedicalRecord
            builder.HasOne(c => c.MedicalRecord)
                .WithMany() // Se MedicalRecordEntity tiver uma lista de condutas, ex: .WithMany(mr => mr.Conducts)
                .HasForeignKey(c => c.MedicalRecordId)
                .OnDelete(DeleteBehavior.Restrict); // Impede que um prontuário seja deletado se tiver condutas

        }
    }
}
