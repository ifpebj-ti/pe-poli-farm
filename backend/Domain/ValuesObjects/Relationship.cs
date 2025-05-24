using Domain.Enums;
using Domain.Exceptions;

namespace Domain.ValuesObjects
{
    public class Relationship
    {
        public string? Value { get; private set; }
        public Relationship(string? value)
        {
            Validate(value);
            this.Value = value;
        }
        private void Validate(string? relationship)
        {
            if(!string.IsNullOrEmpty(relationship))
                if(!Enum.IsDefined(typeof(TypeRelationship), relationship))
                    throw new DomainException("O campo de relacionamento precisa ser um dos seguintes valores: FATHER, MOTHER, SON, SIBLING, SPOUSE, OUTHER");
        }
    }
}
