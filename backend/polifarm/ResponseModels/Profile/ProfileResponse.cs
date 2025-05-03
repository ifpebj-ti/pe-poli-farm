using Domain.ValuesObjects;

namespace WebApi.ResponseModels
{
    public class ProfileResponse
    {
        public Role Role { get; set; }

        public ProfileResponse(Role role) {
            Role = role;
        }
    }
}
