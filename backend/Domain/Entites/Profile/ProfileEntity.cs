using Domain.Entites.User;
using Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.Profile
{
    public class ProfileEntity : BaseEntity
    {
        public Role Role { get; private set; } = null!;
        public ICollection<UserEntity> Users { get; private set; } = null!;
        public ProfileEntity() { }

        public ProfileEntity(Guid id, Role role)
        {
            Id = id;
            Role = role;
        }

        public ProfileEntity(Role role)
        {
            Role = role;
        }
    }
}
