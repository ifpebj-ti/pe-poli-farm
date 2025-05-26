namespace WebApi.ResponseModels.EmergencyContactDetails;

public record EmergencyContactDetailsResponse(Guid? Id, string? Name, string? Phone, string? Relationship);