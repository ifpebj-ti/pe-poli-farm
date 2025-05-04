﻿using Domain.Entites.User;

namespace Application.Gateways
{
    public interface IBcryptGateway
    {
        bool VerifyHashPassword(UserEntity user, string password);
        string GenerateHashPassword(string password);
    }
}
