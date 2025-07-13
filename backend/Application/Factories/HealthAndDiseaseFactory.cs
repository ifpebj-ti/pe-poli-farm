using Domain.Dtos.HealthAndDisease;
using Domain.Entities.HealthAndDisease;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class HealthAndDiseaseFactory
    {
        public static HealthAndDiseaseEntity Create(CreateHealthAndDiseaseDTO dto, Guid medicalRecordId)
        {
            return new HealthAndDiseaseBuilder()
                // Antecedentes Familiares
                .WithFamilyHAS(dto.FamilyHAS)
                .WithFamilyDM(dto.FamilyDM)
                .WithFamilyIAM(dto.FamilyIAM)
                .WithFamilyAVC(dto.FamilyAVC)
                .WithFamilyAlzheimer(dto.FamilyAlzheimer)
                .WithFamilyCA(dto.FamilyCA)
                // Antecedentes Pessoais
                .WithOwnHAS(dto.OwnHAS)
                .WithOwnDM(dto.OwnDM)
                .WithOwnIAM(dto.OwnIAM)
                .WithOwnAVC(dto.OwnAVC)
                .WithOwnAlzheimer(dto.OwnAlzheimer)
                .WithOwnCA(dto.OwnCA)
                // ID do Prontuário
                .WithMedicalRecordId(medicalRecordId)
                .Build();
        }
    }
}
