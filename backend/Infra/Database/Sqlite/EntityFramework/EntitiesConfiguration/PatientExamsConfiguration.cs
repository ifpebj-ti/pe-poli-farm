using Domain.Entities.PatientExams;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration
{
    public class PatientExamsConfiguration : IEntityTypeConfiguration<PatientExamsEntity>
    {
        public void Configure(EntityTypeBuilder<PatientExamsEntity> builder)
        {
            builder.HasKey(pe => pe.Id);

            // Configuração das propriedades
            builder.Property(pe => pe.Description)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(pe => pe.PrescriptionDate)
                .IsRequired();

            builder.Property(pe => pe.ExecutionDate)
                .IsRequired(false);

            builder.ComplexProperty(pe => pe.Priority)
                .Property(a => a.Value)
                .IsRequired();

            // Configuração do relacionamento com MedicalRecord
            builder.HasOne(pe => pe.MedicalRecord)
                .WithMany(mr => mr.PatientExams) // Um MedicalRecord pode ter muitos PatientExams
                .HasForeignKey(pe => pe.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade); // Caso o MedicalRecord seja deletado, todos os exames relacionados também serão
        }
    }
}
