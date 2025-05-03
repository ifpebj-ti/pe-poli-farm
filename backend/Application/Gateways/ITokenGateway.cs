using Domain.Entites.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface ITokenGateway
    {
        string? CreateToken(UserEntity user);
    }
}
