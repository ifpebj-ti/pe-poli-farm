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
    public class PatientPrescriptionConfiguration : IEntityTypeConfiguration<PatientPrescriptionEntity>
    {
        public void Configure(EntityTypeBuilder<PatientPrescriptionEntity> builder)
        {
            builder.HasKey(pe => pe.Id);

            // Configuração das propriedades
            builder.Property(pe => pe.Posology)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(pe => pe.PrescriptionDate)
                .IsRequired();

            builder.Property(pe => pe.ExecutionDate)
                .IsRequired(false);

            builder.Property(pe => pe.MedicationName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(pe => pe.Type)
                .HasMaxLength(50)
                .IsRequired();

            // Configuração do relacionamento com MedicalRecord
            builder.HasOne(pe => pe.MedicalRecord)
                .WithMany(mr => mr.PatientMedications) // Um MedicalRecord pode ter muitos PatientExams
                .HasForeignKey(pe => pe.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade); // Caso o MedicalRecord seja deletado, todos os exames relacionados também serão

            // Configuração do relacionamento com Professional
            builder.HasOne(pe => pe.Professional)
                .WithMany() // Um Professional pode ter muitos PatientExams, mas não precisamos de uma coleção aqui
                .HasForeignKey(pe => pe.ProfessionalId)
                .OnDelete(DeleteBehavior.Restrict); // Não queremos deletar o Professional se houver PatientExams relacionados
        }
    }
}
