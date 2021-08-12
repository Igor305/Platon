using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Models.Response
{
    public class TypeCreditorResponseModel
    {
        public TypeCreditorModel typeCreditorModel { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
