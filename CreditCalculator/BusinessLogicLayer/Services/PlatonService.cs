using BusinessLogicLayer.Models;
using BusinessLogicLayer.Models.Response;
using BusinessLogicLayer.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace BusinessLogicLayer.Services
{
    public class PlatonService : IPlatonService
    {
        private static List<CreditorModel> creditorModels = new List<CreditorModel>();

        public CreditorResponseModel getCreditors()
        {
            CreditorResponseModel creditorResponseModel = new CreditorResponseModel();

            try
            { 
            creditorResponseModel.creditorModels = creditorModels;
            creditorResponseModel.Status = true;
            creditorResponseModel.Message = "successfully";
            }
            catch(Exception e)
            {
                creditorResponseModel.Status = false;
                creditorResponseModel.Message = e.Message;
            }

            return creditorResponseModel;
        }

        public ResponseModel addCreditor ( CreditorModel creditorModel )
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditorModel.Name == creditor.Name)
                    {
                        responseModel.Status = false;
                        responseModel.Message = $"Кредитор {creditorModel.Name} назвою вже існує";
                        return responseModel;
                    }
                }

                creditorModels.Add(creditorModel);
                responseModel.Status = true;
                responseModel.Message = $"Кредитор {creditorModel.Name} успішно доданий";
            }
            catch(Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;

        }

        public ResponseModel updateCreditor ( CreditorModel creditorModel )
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditorModel.Name == creditor.Name)
                    {
                        creditor.Bid = creditorModel.Bid;
                        creditor.ThereIsAType = creditorModel.ThereIsAType;
                        creditor.typeCreditorModels = creditorModel.typeCreditorModels;
                    }
                }
                responseModel.Status = true;
                responseModel.Message = "successfully";
            }
            catch(Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;

        }

        public ResponseModel deleteCreditor ( string name ) 
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == name);

                if(creditorModel == null)
                {
                    responseModel.Status = false;
                    responseModel.Message = $"Кредитор {name} не існує";

                    return responseModel;
                }

                creditorModels.Remove(creditorModel);
                responseModel.Status = true;
                responseModel.Message = $"Кредитор {creditorModel.Name} успішно видалений";
            }
            catch(Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }
    }
}
