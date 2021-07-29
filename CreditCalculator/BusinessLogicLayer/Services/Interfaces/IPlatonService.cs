using BusinessLogicLayer.Models;
using BusinessLogicLayer.Models.Response;

namespace BusinessLogicLayer.Services.Interfaces
{
    public interface IPlatonService
    {
        public CreditorResponseModel getCreditors();
        public ResponseModel addCreditor(CreditorModel creditorModel);
        public ResponseModel updateCreditor(CreditorModel creditorModel);
        public ResponseModel deleteCreditor(string name);

    }
}
