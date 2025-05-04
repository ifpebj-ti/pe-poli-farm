using Domain.Dtos.User;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.Entities.AccessCode;
using Domain.Entities.Profile;
using Domain.Entities.User;
using Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class UserFactory
    {
        public static UserEntity CreateUser(CreateUserDTO data, AccessCodeEntity accessCode, List<ProfileEntity> profiles)
        {
            var genericPassword = $"{data.Email}_{data.Cpf}";
            var profile = profiles.Find(p => p.Role.Value == data.Profile.Role);

            return new UserEntityBuilder()
                .WithName(data.Name)
                .WithEmail(new Email(data.Email))
                .WithCpf(new CPF(data.Cpf))
                .WithPosition(new Positions(data.Position))
                .WithPassword(genericPassword)
                .WithActive(true)
                .WithFirstAccess(false)
                .WithProfile(profile!)
                .WithAccessCode(new AccessCodeEntityBuilder()
                    .WithCode(accessCode.Code)
                    .WithIsActive(accessCode.IsActive)
                    .WithIsUserUpdatePassword(accessCode.IsUserUpdatePassword)
                    .WithExperimentDate(accessCode.ExperationDate)
                    .Build())
                .Build();
        }

        public static UserEntity CreateUser(UserEntity user, string password, bool firstAccess)
        {
            user.Password = password;
            user.FirstAccess = firstAccess;
            return user;
        }
        public static UserEntity CreateUser(UserEntity user)
        {
            return new UserEntityBuilder()
                .WithId(user.Id)
                .WithName(user.Name)
                .WithEmail(new Email(user.Email.Value))
                .WithCpf(new CPF(user.Cpf.Value))
                .WithPosition(new Positions(user.Position.Value))
                .WithPassword(user.Password)
                .WithActive(user.Active)
                .WithFirstAccess(true)
                .WithProfile(new ProfileEntityBuilder()
                    .WithId(user.Profile.Id)
                    .WithRoleType(new Role(user.Profile.Role.Value))
                    .Build())
                .WithAccessCode(new AccessCodeEntityBuilder()
                    .WithId(user.AccessCode.Id)
                    .WithCode(user.AccessCode.Code)
                    .WithIsActive(user.AccessCode.IsActive)
                    .WithIsUserUpdatePassword(user.AccessCode.IsUserUpdatePassword)
                    .WithExperimentDate(user.AccessCode.ExperationDate)
                    .Build())
                .Build();
        }
    }
}
