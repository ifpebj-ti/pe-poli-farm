using Application.Gateways;
using Domain.Entites.User;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Infra.Gateways
{
    public class TokenGateway(IConfiguration configuration) : ITokenGateway
    {
        public string? CreateToken(UserEntity user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = configuration.GetValue<string>("JWT_SETTINGS:SECRET");
            var issuer = configuration.GetValue<string>("JWT_SETTINGS:ISS");
            var audience = configuration.GetValue<string>("JWT_SETTINGS:AUD");
            if (string.IsNullOrWhiteSpace(key) || string.IsNullOrWhiteSpace(issuer) || string.IsNullOrWhiteSpace(audience))
                return null;

            var keyEncoded = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.Name, user.Name),
                    new(ClaimTypes.Role, user.Profile.Role.Value),
                    new(ClaimTypes.Email, user.Email.Value),
                    new("userId", user.Id.ToString()),
                    new("position", user.Position.Value),
                    new("firstAccess", user.FirstAccess.ToString()),
                    new("active", user.Active.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyEncoded), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
