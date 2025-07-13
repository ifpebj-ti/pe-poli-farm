using Domain.Enums;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValuesObjects
{
    public class ExamPriorityStatus
    {
        public string Value { get; private set; }

        public ExamPriorityStatus(string value)
        {
            if (!Enum.IsDefined(typeof(ExamPriorityStatusType), value))
                throw new DomainException("A prioridade do exame deve ser uma das seguintes: " +
                                          "BAIXA, " +
                                          "NORMAL, " +
                                          "ALTA, "
                                          );
            this.Value = value;
        }
    }
}
