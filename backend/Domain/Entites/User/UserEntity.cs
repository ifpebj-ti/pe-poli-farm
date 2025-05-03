using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.User
{
    public class UserEntity : BaseEntity
    {
        public UserEntity(Guid id, string name, Email email, CPF cpf, Positions position, string password, bool firstAccess, bool active, ProfileEntity profile, AccessCodeEntity accessCode)
        {
            Id = id;
            Name = name;
            Email = email;
            Cpf = cpf;
            Position = position;
            Password = password;
            FirstAccess = firstAccess;
            Active = active;
            Profile = profile;
            AccessCode = accessCode;
        }

        public UserEntity(string name, Email email, CPF cpf, Positions position, string password, bool firstAccess, bool active, ProfileEntity profile, AccessCodeEntity accessCode)
        {
            Name = name;
            Email = email;
            Cpf = cpf;
            Position = position;
            Password = password;
            FirstAccess = firstAccess;
            Active = active;
            Profile = profile;
            AccessCode = accessCode;
        }

        public UserEntity() { }
        public string Name { get; private set; } = string.Empty;
        public Email Email { get; private set; } = null!;
        public CPF Cpf { get; private set; } = null!;
        public Positions Position { get; private set; } = null!;
        public string Password { get; set; } = string.Empty;
        public bool FirstAccess { get; set; } = false;
        public bool Active { get; private set; } = true;
        public ProfileEntity Profile { get; private set; } = null!;
        public long ProfileId { get; private set; }
        public AccessCodeEntity AccessCode { get; private set; } = null!;
    }
}
