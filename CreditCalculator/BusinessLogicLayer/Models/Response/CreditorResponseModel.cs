using System.Collections.Generic;

namespace BusinessLogicLayer.Models.Response
{
    public class CreditorResponseModel
    {
        public List<CreditorModel> creditorModels { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }

        public CreditorResponseModel()
        {
            creditorModels = new List<CreditorModel>();
        }
    }
}
