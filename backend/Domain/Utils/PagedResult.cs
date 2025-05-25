using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Utils
{
    public class PagedResult<T>
    {
        public T Pages { get; set; }
        public int TotalRecords { get; set; }
    }
}
