using Domain.Entites.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites.AccessCode
{
    public class AccessCodeEntity : BaseEntity
    {
        public string Code { get; private set; } = string.Empty;
        public bool IsActive { get; private set; } = true;
        public bool IsUserUpdatePassword { get; private set; } = false;
        public DateTime ExperationDate { get; private set; }
        public Guid UserId { get; private set; }
        public UserEntity User { get; private set; }

        public AccessCodeEntity() { }

        public AccessCodeEntity(Guid id, string code, bool isActive, bool isUserUpdatePassword, DateTime experationDate)
        {
            Id = id;
            Code = code;
            IsActive = isActive;
            IsUserUpdatePassword = isUserUpdatePassword;
            ExperationDate = experationDate;
        }
    }
}
