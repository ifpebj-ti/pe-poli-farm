using Domain.Entities.HealthAndDisease;
using WebApi.ResponseModels.HealthAndDisease;

namespace WebApi.ResponseModels.HealthAndDisease
{
    public class HealthAndDiseaseResponseModels
    {
        public static HealthAndDiseaseResponse CreateHealthAndDiseaseResponse(HealthAndDiseaseEntity healthAndDiseaseEntity)
        {
            return new HealthAndDiseaseResponseBuilder()
                .WithId(healthAndDiseaseEntity.Id)
                .WithFamilyHAS(healthAndDiseaseEntity.FamilyHAS)
                .WithFamilyDM(healthAndDiseaseEntity.FamilyDM)
                .WithFamilyIAM(healthAndDiseaseEntity.FamilyIAM)
                .WithFamilyAVC(healthAndDiseaseEntity.FamilyAVC)
                .WithFamilyAlzheimer(healthAndDiseaseEntity.FamilyAlzheimer)
                .WithFamilyCA(healthAndDiseaseEntity.FamilyCA)
                .WithOwnHAS(healthAndDiseaseEntity.OwnHAS)
                .WithOwnDM(healthAndDiseaseEntity.OwnDM)
                .WithOwnIAM(healthAndDiseaseEntity.OwnIAM)
                .WithOwnAVC(healthAndDiseaseEntity.OwnAVC)
                .WithOwnAlzheimer(healthAndDiseaseEntity.OwnAlzheimer)
                .WithOwnCA(healthAndDiseaseEntity.OwnCA)
                .WithMedicalRecordId(healthAndDiseaseEntity.MedicalRecordId)
                .Build();
        }
    }

}
