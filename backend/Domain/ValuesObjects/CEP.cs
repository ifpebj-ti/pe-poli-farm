using Domain.Exceptions;
using prontuario.Domain;
using System.Text.RegularExpressions;

namespace Domain.ValuesObjects
{
    public class CEP
    {
        public string? Value { get; private set; }

        public CEP(string? value)
        {
            if(!string.IsNullOrEmpty(value))
                if (!Regex.IsMatch(value, @"^\d{5}-\d{3}$"))
                    throw new DomainException("CEP inválido. Deve estar no formato 12345-678.");

            this.Value = value;
        }
    }
}
