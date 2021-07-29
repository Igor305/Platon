using System.Collections.Generic;

namespace BusinessLogicLayer.Models
{
    public class CreditorModel
    {
        public string Name { get; set; }
        public decimal Bid { get; set; }
        public bool ThereIsAType { get; set; }
        public List<TypeCreditorModel> typeCreditorModels { get; set; }

        public CreditorModel()
        {
            typeCreditorModels = new List<TypeCreditorModel>();
        }
    }
}
