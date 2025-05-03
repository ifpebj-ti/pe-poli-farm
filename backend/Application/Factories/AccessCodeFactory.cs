using Domain.Entites.AccessCode;
using Domain.Entities.AccessCode;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class AccessCodeFactory
    {
        public static AccessCodeEntity CreateAccessCodeEntity()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();

            var code = new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            var expiration = DateTime.UtcNow.AddMinutes(5);

            return new AccessCodeEntityBuilder()
                .WithCode(code)
                .WithExperimentDate(expiration)
                .WithIsActive(true)
                .WithIsUserUpdatePassword(false)
                .Build();
        }
    }
}
