namespace WebApi.ResponseModels.HealthAndDisease
{
    public record HealthAndDiseaseResponse(
        Guid Id,
        bool FamilyHAS,
        bool FamilyDM,
        bool FamilyIAM,
        bool FamilyAVC,
        bool FamilyAlzheimer,
        bool FamilyCA,
        bool OwnHAS,
        bool OwnDM,
        bool OwnIAM,
        bool OwnAVC,
        bool OwnAlzheimer,
        bool OwnCA,
        Guid MedicalRecordId
    );

}
