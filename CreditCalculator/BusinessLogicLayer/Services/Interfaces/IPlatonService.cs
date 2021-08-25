using BusinessLogicLayer.Models;
using BusinessLogicLayer.Models.Response;

namespace BusinessLogicLayer.Services.Interfaces
{
    public interface IPlatonService
    {
        public CreditorResponseModel getCreditors();
        public void addCountVisit();
        public void addCountInfo();
        public void addCountResult();
        public CountersResponseModel getСounters();
        public ResponseModel renameCreditor(string name, string newName);
        public ResponseModel addCreditor(CreditorModel creditorModel);
        public ResponseModel addTypeCreditor(string name, TypeCreditorModel typeCreditorModel);
        public TypeCreditorResponseModel readTypeCreditorModel(string nameCreditor, string nameTypeCreditor);
        public ResponseModel updateTypeCreditor(string nameCreditor, string nameTypeCreditor, TypeCreditorModel typeCreditorModel);
        public ResponseModel delTypeCreditor(string nameCreditor, string nameTypeCreditor);
        public ResponseModel deleteCreditor(string name);

    }
}
