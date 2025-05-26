using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prontuario.Domain.Entities.PatientMedication;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration
{
    public class PatientMedicationConfiguration : IEntityTypeConfiguration<PatientMedicationEntity>
    {
        public void Configure(EntityTypeBuilder<PatientMedicationEntity> builder)
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

            // Configuração do relacionamento com MedicalRecord
            builder.HasOne(pe => pe.MedicalRecord)
                .WithMany(mr => mr.PatientMedications) // Um MedicalRecord pode ter muitos PatientExams
                .HasForeignKey(pe => pe.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade); // Caso o MedicalRecord seja deletado, todos os exames relacionados também serão
        }
    }
}
