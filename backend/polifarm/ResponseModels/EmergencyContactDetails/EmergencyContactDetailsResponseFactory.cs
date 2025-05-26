using Domain.Entities.EmergencyContactDetails;

namespace WebApi.ResponseModels.EmergencyContactDetails;

public class EmergencyContactDetailsResponseFactory
{
    public static EmergencyContactDetailsResponse CreateCompleteEmergencyContactDetailsResponse(EmergencyContactDetailsEntity emergencyContactDetailsEntity)
    {
        return new EmergencyContactDetailsResponseBuilder()
            .WithId(emergencyContactDetailsEntity.Id)
            .WithName(emergencyContactDetailsEntity.Name)
            .WithPhone(emergencyContactDetailsEntity.Phone.Value)
            .WithRelationship(emergencyContactDetailsEntity.Relationship.Value)
            .Build();
    }
}