using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.ValuesObjects
{
    public class CPF
    {
        public string Value { get; private set; }

        public CPF(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new DomainException("CPF não pode ser vazio ou nulo.");

            if (!Regex.IsMatch(value, "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"))
                throw new DomainException("CPF inválido. Deve estar no formato 000.000.000-00.");

            this.Value = value;
        }
    }
}
