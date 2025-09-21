using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.User
{
    public sealed record UpdateUserDTO(string? name, string? email, string? password, Guid? profileId);
}
