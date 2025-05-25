namespace prontuario.Domain.ValuesObjects
{
    public class RG
    {
        public string? Value { get; private set; }
        public RG(string? value)
        {
            this.Value = value;
        }
    }
}
