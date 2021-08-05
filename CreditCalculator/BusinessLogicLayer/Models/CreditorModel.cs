using System.Collections.Generic;

namespace BusinessLogicLayer.Models
{
    public class CreditorModel
    {
        public string Name { get; set; }
        public decimal MinSum { get; set; }
        public decimal MaxSum { get; set; }
        public decimal MinTerm { get; set; }
        public decimal MaxTerm { get; set; }
        public decimal Bid { get; set; }
        public List<TypeCreditorModel> typeCreditorModels { get; set; }
        public CreditorModel()
        {
            typeCreditorModels = new List<TypeCreditorModel>();
        }
    }
}
