using Domain.Enums;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValuesObjects
{
    public class Positions
    {
        public string Value { get; private set; }
        public Positions(string value)
        {
            if (!Enum.IsDefined(typeof(PositionType), value))
                throw new DomainException("O cargo precisa ser um dos seguintes valores: RECEPCTION, MANAGEMENT, DOCTOR, NURSE, NURSING_TECHNICIAN, PHYSIOTHERAPIST, PSYCHOLOGIST, NUTRITIONIST, PHARMACEUTICAL, OCCUPATIONAL_THERAPIST, BIOCHEMICAL, X_RAY_TECHNICIAN, LABORATORY_TECHNICIAN");
            Value = value;
        }
    }
}
