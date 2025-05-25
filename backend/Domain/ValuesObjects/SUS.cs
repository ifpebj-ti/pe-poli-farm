using Domain.Exceptions;
using System.Text.RegularExpressions;

namespace prontuario.Domain.ValuesObjects
{
    public class SUS
    {
        public string? Value { get; private set; }
        public SUS(string? value)
        {
            if(!string.IsNullOrEmpty(value))
                if (!Regex.IsMatch(value, "^\\d{15}$"))
                    throw new DomainException("Número do SUS inválido. Deve conter exatamente 15 dígitos.");

            this.Value = value;
        }
    }
}
