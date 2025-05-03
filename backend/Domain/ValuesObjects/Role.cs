using Domain.Enums;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValuesObjects
{
    public class Role
    {
        public string Value { get; private set; }

        public Role(string value)
        {
            if (!Enum.IsDefined(typeof(RoleType), value))
                throw new DomainException("A role precisa ser um dos seguintes valores: ADMIN, RECEPTIONTEAM, HEALTHTEAM, INTITUATIONMANAGEMENT");
            Value = value;
        }
    }
}
