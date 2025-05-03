namespace Domain.Dtos.AccessCode
{
    public record AccessCodeDTO(long Id, string Code, bool IsActive, bool IsUserUpdatePassword, DateTime ExperationDate)
    {
    }
}
