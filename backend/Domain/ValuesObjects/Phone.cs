using System.Text.RegularExpressions;

namespace Domain.ValuesObjects
{
    public class Phone
    {
        public string? Value { get; private set; }
        public Phone(string? value)
        {
            this.Value = value;
        }
    }
}
