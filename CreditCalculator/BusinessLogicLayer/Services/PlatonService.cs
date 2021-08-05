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

        public ResponseModel addTypeCreditor (string name, TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = new ResponseModel();
            try
            {
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == name);

                foreach (CreditorModel creditor in creditorModels)
                {
                    if(creditor.Name == name)
                    {
                        creditor.typeCreditorModels.Add(typeCreditorModel);
                    }
                }

                responseModel.Status = true;
                responseModel.Message = $"Тип {typeCreditorModel.Name} доданий кредитору {name} ";
            }
            catch (Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }

        public ResponseModel delTypeCreditor(string nameCreditor, string nameTypeCreditor)
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {               
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == nameCreditor);

                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditor.Name == nameCreditor)
                    {
                        TypeCreditorModel typeCreditorModel = creditor.typeCreditorModels.Find(x => x.Name == nameTypeCreditor);
                        creditor.typeCreditorModels.Remove(typeCreditorModel);                       
                    }
                }
                responseModel.Status = true;
                responseModel.Message = $"Тип {nameTypeCreditor} видалений у кредитора {nameCreditor} ";
            }
            catch (Exception e)
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
